import React, { useState, useEffect, useContext } from "react";
import { useSpring, animated } from 'react-spring';
import { makeStyles } from "@material-ui/core/styles";
import { easeCubicInOut } from 'd3-ease';
import { AppContext } from "../App/AppContext";
import Controls from "../Controls/Controls";
import Carousel from "../Carousel/Carousel";
import ContentDrawer from "../ContentDrawer/ContentDrawer";
import BackButton from '../BackButton';
import ImageCredit from '../ContentDrawer/ImageCredit';
import { trackPageview } from '../utils/analytics';

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    height: "100vh",
    backgroundColor: "#ededed",
    overflow: 'hidden',
    touchAction: 'pan-x pan-y'
  },
  bar: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 180,
    zIndex: 260,
    backgroundSize: 'auto 100%',
    pointerEvents: 'none'
  },
  barTop: {
    top: -30,
    background: "linear-gradient(to bottom, rgba(237,237,237,0.75) 0%, rgba(0,0,0,0) 100%)"
  },
  barBottom: {
    bottom: -30,
    background: "linear-gradient(to top, rgba(237,237,237,0.75) 0%, rgba(0,0,0,0) 100%)"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 10,
    backgroundColor: theme.palette.common.white
  }
}));

const Gallery = ({ title, items }) => {
  const classes = useStyles();
  const [state] = useContext(AppContext);
  const { currentSlide, isTransitioningHome } = state;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCanInteract(true)
    }, 3000);

    return () => clearTimeout(timeout);
  }, [])

  useEffect(() => {
    const { eoltitle, title: folTitle, original } = items[currentSlide]

    trackPageview({
      content: {
        galleryName: title,
        screenName: ''
      },
      page: {
        environment: state.env.server,
        name: eoltitle ? [eoltitle, folTitle].join('/') : folTitle,
        imageName: original
      }
    })
  }, [currentSlide])

  const Bars = () => (
    <>
      <div className={`${classes.bar} ${classes.barTop}`} />
      <div className={`${classes.bar} ${classes.barBottom}`} />
    </>
  )

  const rootSpring = useSpring({
    opacity: isTransitioningHome ? 0 : 1,
    from: { opacity: isTransitioningHome ? 1 : 0 },
    delay: isTransitioningHome ? 500 : 0
  })

  const [canInteract, setCanInteract] = useState(false);

  const spring = useSpring({
    to: [{
      opacity: 1,
      top: '0%',
      config: {
        duration: 2000,
        easing: easeCubicInOut
      }
    }, {
      left: '0px',
      config: {
        duration: 1000,
        easing: easeCubicInOut
      }
    }],
    from: {
      left: '-200px',
      top: '25%',
      width: '100%',
      height: '100%',
      position: 'absolute',
      opacity: 0,
    },
  });

  return (
    <animated.div
      style={rootSpring}
      className={classes.root}
    >
      <Controls {...items[currentSlide]} />
      <BackButton {...items[currentSlide]} />
      <ContentDrawer {...items[currentSlide]} />
      <ImageCredit {...items[currentSlide]} />

      <animated.div
        style={{
          ...spring,
          pointerEvents: canInteract ? 'auto' : 'none'
        }}
      >
        <Carousel items={items} />
      </animated.div>

      <Bars />
    </animated.div>
  );
};

export default Gallery;
