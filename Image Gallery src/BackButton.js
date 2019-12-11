import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from "./App/AppContext";
import { makeStyles } from "@material-ui/core/styles";
import { useSpring, animated } from 'react-spring';
import IconButton from "@material-ui/core/IconButton";
import { trackEvent } from './utils/analytics';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 10,
    left: 20,
    zIndex: 410
  },
  button: {
    padding: '40px 40px 40px 20px',
    background: "none",
    "&:hover": {
      background: "none"
    }
  }
}));

const BackButton = ({ eoltitle, title: folTitle }) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [state, setState] = useContext(AppContext);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 3200);

    return () => clearTimeout(timeout);
  }, [])

  const resetZoom = () => state.instance.viewport.goHome()

  const resetViewer = () => {
    setState(state => ({
      ...state,
      drawerOpen: true,
      viewerExpanded: false
    }))
  }

  const hideDrawer = () => {
    setState(state => ({
      ...state,
      drawerOpen: false,
      showControls: false,
      isTransitioningHome: true
    }))
  }

  const goHome = () => {
    setState(state => ({
      ...state,
      currentSlide: undefined
    }))
  }

  const onClick = () => {
    const { instance } = state;
    const zoom = instance.viewport.getZoom();

    if (zoom > instance.viewport.minZoomLevel) {
      // Zoomed in - reset zoom
      resetZoom();
      resetViewer();
    } else {
      hideDrawer();
      setTimeout(() => goHome(), 2000);
    }

    trackEvent({
      name: 'cta',
      category: 'navigation',
      action: 'back arrow',
      label: eoltitle ? [eoltitle, folTitle].join('/') : folTitle
    })
  }

  const spring = useSpring({
    opacity: show ? 1 : 0,
    transform: show ? 'translateX(0px)' : 'translateX(20px)',
    from: { x: 20, opacity: 0, transform: 'translateX(20px)'},
  });

  return (
    <div className={classes.root}>
      <IconButton
        onClick={onClick}
        className={classes.button}
      >
        <animated.svg
          style={spring}
          width="40" height="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.799 8.93H39.38v2H3.797l7.517 7.515-1.415 1.415L0 9.96l.03-.03L0 9.9 9.9 0l1.414 1.414L3.799 8.93z" fill="#313131" fillRule="nonzero" />
        </animated.svg>
      </IconButton>
    </div>
  )
}

export default BackButton;
