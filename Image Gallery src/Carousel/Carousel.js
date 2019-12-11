import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSpring, animated } from 'react-spring';
import EmblaCarouselReact from "embla-carousel-react";
import { AppContext } from "../App/AppContext";
import OpenSeadragonContainer from './OpenSeadragonContainer';
import { PrevButton, NextButton } from "./CarouselButtons";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import { trackEvent } from "../utils/analytics";

const useStyles = makeStyles(theme => ({
  slider: {
    display: "flex",
  },
  slide: {
    flex: "0 0 100%",
    height: "100vh",
  },
  controlsRoot: {
    position: 'relative',
    zIndex: 300,
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    left: 400,
    right: 0,
    bottom: 45,
    paddingLeft: 40,
    paddingRight: 40,
    zIndex: 300,
  },
  buttons: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    zIndex: 300,
  },
  progress: {
    width: 100,
    fontSize: 18,
    textAlign: 'center'
  }
}))

const Carousel = ({ items }) => {
  const [state, setState] = useContext(AppContext);
  const [embla, setEmbla] = useState(null);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const classes = useStyles()

  const controlsSpring = useSpring({
    opacity: state.drawerOpen ? 1 : 0,
    pointerEvents: state.drawerOpen ? 'auto' : 'none',
    config: { mass: 1, tension: 280, friction: 60 },
    delay: state.isFirstLoad ? 2000 : 0
  })

  const setCurrentSlide = () => {
    setState(state => ({
      ...state,
      currentSlide: embla.selectedScrollSnap()
    }));
  }

  const scrollPrev = () => {
    embla.scrollPrev()

    const newSlide = embla.selectedScrollSnap();
    const { eoltitle, title: folTitle } = items[newSlide];

    trackEvent({
      name: 'swipe',
      category: 'image navigation',
      action: 'arrow-press backward',
      label: eoltitle ? [eoltitle, folTitle].join('/') : folTitle
    })
  };

  const scrollNext = () => {
    embla.scrollNext()

    const newSlide = embla.selectedScrollSnap();
    const { eoltitle, title: folTitle } = items[newSlide];

    trackEvent({
      name: 'swipe',
      category: 'image navigation',
      action: 'arrow-press forward',
      label: eoltitle ? [eoltitle, folTitle].join('/') : folTitle
    })
  };

  useEffect(() => {
    setState(state => ({
      ...state,
      drawerOpen: true,
      viewerExpanded: false,
      isTransitioningHome: false
    }));

    const timeout = setTimeout(() => {
      setState(state => ({
        ...state,
        showControls: true
      }))
    }, 3000);

    return () => clearTimeout(timeout);
  }, [])

  useEffect(() => {
    // Keep slide number to calculate direction
    let prevSlide;

    if (embla) {
      setScrollSnaps(embla.scrollSnapList());

      embla.on("select", () => {
        setCurrentSlide();
      });

      embla.on("dragStart", () => {
        prevSlide = embla.selectedScrollSnap()
      })

      // Track swiping through the gallery
      embla.on("dragEnd", () => {
        const total = embla.scrollSnapList().length;
        const newSlide = embla.selectedScrollSnap();

        // Details of the object swiping from
        // ie not the one landed on
        const { eoltitle, title: folTitle } = items[prevSlide];

        if (prevSlide === newSlide) return false;

        let direction;

        // From/to first/last slides
        if (Math.abs(newSlide - prevSlide) > 1) {
          // From last slide
          if (prevSlide + 1 === total) direction = 'forward';

          // From first slide
          if (prevSlide === 0) direction = 'backward';
        } else {
          direction = newSlide - prevSlide > 0 ? 'forward' : 'backward';
        }

        trackEvent({
          name: 'swipe',
          category: 'image navigation',
          action: `swipe ${direction}`,
          label: eoltitle ? [eoltitle, folTitle].join('/') : folTitle
        })
      })
    }

    return () => embla && embla.destroy();
  }, [embla]);

  useEffect(() => {
    if (embla) {
      embla.changeOptions({
        draggable: !state.canZoomOut,
      })
    }
  }, [state.canZoomOut])

  const setZoom = e => {
    // Events with immediately: true are fired on onOpen
    // We want to listen for zoom actions initiated by the user
    if (!e.immediately) {
      setState(state => ({
        ...state,
        canZoomIn:
          e.eventSource.viewport.getZoom() <
          e.eventSource.viewport
            .maxZoomLevel,
        canZoomOut:
          e.eventSource.viewport.getZoom() >
          e.eventSource.viewport
            .minZoomLevel
      }));
    }
  }

  const onOpen = e => {
    e.eventSource.viewport.minZoomLevel = e.eventSource.viewport._oldZoom;
    setState(state => ({
      ...state,
      instance: e.eventSource
    }));
  };

  const onZoom = e => {
    setZoom(e);
  }

  const onCanvasPinch = e => {
    setZoom(e);

    // If using pinch to zoom out back to 1 - bring back drawer
    if (e.eventSource.viewport.getZoom() === e.eventSource.viewport.minZoomLevel) {
      setState(state => ({
        ...state,
        drawerOpen: true,
        viewerExpanded: false
      }));
    }

    const newSlide = embla.selectedScrollSnap();
    const { eoltitle, title: folTitle } = items[newSlide];
    const direction = e.distance > e.lastDistance ? 'zoomed-in' : 'zoomed-out';

    trackEvent({
      name: 'cta',
      category: 'zoom',
      action: `pinch ${direction}`,
      label: eoltitle ? [eoltitle, folTitle].join('/') : folTitle
    })
  }

  const onCanvasClick = e => {
    // Don't zoom in on single click
    e.preventDefaultAction = true

    // e.eventSource.viewport.setMargins({
    //   left: 0,
    //   top: 0,
    //   right: 0,
    //   bottom: 0
    // });

    // TODO - see if this can be fired on release or something
    // currently fires on swiping

    // setState(state => ({
    //   ...state,
    //   drawerOpen: false,
    //   viewerExpanded: true
    // }));
  }

  const onCanvasDBClick = e => {
    e.preventDefaultAction = true;

    if (e.eventSource.viewport.getZoom() > e.eventSource.viewport.minZoomLevel) {
      e.eventSource.viewport.goHome();

      setState(state => ({
        ...state,
        drawerOpen: true,
        viewerExpanded: false,
      }))
    } else {

      // TODO: this is should be in, but also need to reset to originals (with offsets) when zooming out.
      // e.eventSource.viewport.setMargins({
      //   left: 0,
      //   top: 0,
      //   right: 0,
      //   bottom: 0
      // });

      e.eventSource.viewport.zoomTo(e.eventSource.viewport.maxZoomLevel);

      setState(state => ({
        ...state,
        drawerOpen: false,
        viewerExpanded: true
      }))
    }
  }

  const Progress = () => (
    <div className={classes.progress}>{`${state.currentSlide + 1}/${scrollSnaps.length}`}</div>
  )

  const emblaOpts = {
    loop: true,
    draggable: !state.viewerExpanded,
    startIndex: state.currentSlide
  }

  return (
    <>
      <EmblaCarouselReact
        htmlTagName="div"
        emblaRef={c => setEmbla(c)}
        options={emblaOpts}
      >
        <div className={classes.slider}>
          {items.map(({ id, original }, index) => (
            <div key={id} className={classes.slide}>
              {index === state.currentSlide
                ? <OpenSeadragonContainer
                    key={id}
                    url={original}
                    onOpen={onOpen}
                    onZoom={onZoom}
                    onCanvasPinch={onCanvasPinch}
                    onCanvasClick={onCanvasClick}
                    onCanvasDBClick={onCanvasDBClick}
                  />
                : <div />}
            </div>
          ))}
        </div>
      </EmblaCarouselReact>

      <animated.div className={classes.controlsRoot} style={controlsSpring}>
        <div className={classes.controls}>
          <PrevButton onClick={scrollPrev} />
          <Progress />
          <NextButton onClick={scrollNext} />
        </div>

        <div className={classes.buttons}>
          <LanguageToggle />
        </div>
      </animated.div>
    </>
  );
};

export default Carousel;
