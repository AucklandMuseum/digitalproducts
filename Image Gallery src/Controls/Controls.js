import React, { useState, useEffect, useContext } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import { useTrail, animated } from 'react-spring';
import { easeCubicInOut } from 'd3-ease';
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button";
import { AppContext } from "../App/AppContext";
import { trackEvent } from "../utils/analytics";
import homeIcon from './home-icon';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    position: "absolute",
    top: 40,
    right: 40,
    zIndex: 300,
  },
  iconButton: {
    color: '#313131',
    marginRight: 24,
  },
  iconLabel: {
    fontSize: 11,
    fontFamily: 'GothamNarrow',
    fontWeight: 500,
    textTransform: 'uppercase',
    marginLeft: 10
  },
  svg: {
    fill: '#313131',
    '.Mui-disabled &': {
      fill: fade('#313131', 0.2)
    }
  },
  homeButton: {
    height: 36,
    border: "2px solid #313131",
    paddingLeft: 30,
    paddingRight: 30,
    '&:hover': {
      color: 'inherit',
      backgroundColor: 'inherit'
    }
  },
  homeIcon: {
    position: 'top',
    top: -1,
    height: 14,
    marginRight: 8,
  },
  homeLabel: {
    fontSize: 14,
    fontFamily: 'GothamNarrow',
    fontWeight: 500,
    lineHeight: 1
  }
}));

const ZoomIn = () => {
  const classes = useStyles();

  return (
    <svg width="37" height="36" xmlns="http://www.w3.org/2000/svg">
      <g className={classes.svg} fillRule="nonzero">
        <path d="M5.35 29.735A17.93 17.93 0 0 1 1 18C1 8.059 9.059 0 19 0s18 8.059 18 18-8.059 18-18 18c-4.738 0-9.048-1.83-12.263-4.823l-4.505 4.505-1.414-1.414 4.533-4.533zM19 34.105c8.895 0 16.105-7.21 16.105-16.105S27.895 1.895 19 1.895 2.895 9.105 2.895 18 10.105 34.105 19 34.105z" />
        <path d="M20 17h4v2h-4v4h-2v-4h-4v-2h4v-4h2v4z" />
      </g>
    </svg>
  )
};

const ZoomOut = () => {
  const classes = useStyles();

  return (
    <svg width="37" height="36" xmlns="http://www.w3.org/2000/svg">
      <g className={classes.svg} fillRule="nonzero">
        <path d="M5.35 29.735A17.93 17.93 0 0 1 1 18C1 8.059 9.059 0 19 0s18 8.059 18 18-8.059 18-18 18c-4.738 0-9.048-1.83-12.263-4.823l-4.505 4.505-1.414-1.414 4.533-4.533zM19 34.105c8.895 0 16.105-7.21 16.105-16.105S27.895 1.895 19 1.895 2.895 9.105 2.895 18 10.105 34.105 19 34.105z" />
        <path d="M24 17H14v2h10z" />
      </g>
    </svg>
  )
};

const Controls = ({ eoltitle, title: folTitle }) => {
  const classes = useStyles();
  const [state, setState] = useContext(AppContext);
  const { showControls, canZoomIn, canZoomOut } = state;

  const resetZoom = () => state.instance.viewport.goHome()

  const resetViewer = () => {
    setState(state => ({
      ...state,
      showControls: false,
      drawerOpen: false,
      viewerExpanded: false,
      isTransitioningHome: true
    }))
  }

  const goHome = () => {
    setState(state => ({
      ...state,
      currentSlide: undefined
    }))
  }

  const onZoom = (label) => {
    const { instance } = state;
    const zoom = instance.viewport.getZoom();

    setState(state => ({
      ...state,
      drawerOpen: zoom === instance.viewport.minZoomLevel,
      viewerExpanded: zoom > instance.viewport.minZoomLevel,
    }))

    trackEvent({
      name: 'cta',
      category: 'zoom',
      action: `pinch ${label}`,
      label: eoltitle ? [eoltitle, folTitle].join('/') : folTitle
    })
  }

  const onHome = () => {
    resetZoom();
    resetViewer();
    setTimeout(() => goHome(), 1000);
  }

  const HomeButton = () => (
    <Button className={classes.homeButton} onClick={onHome}>
      <img className={classes.homeIcon} src={homeIcon} alt="" />
      <span className={classes.homeLabel}>Home</span>
    </Button>
  )

  const items = [
    <div
      id="ZoomInButton"
      onClick={() => onZoom('zoomed-in')}
      style={{
        pointerEvents: canZoomIn ? 'auto' : 'none'
      }}
    >
      <IconButton  className={classes.iconButton} disabled={!canZoomIn}>
        <ZoomIn />
        <span className={classes.iconLabel}>Zoom in</span>
      </IconButton>
    </div>,
    <div
      id="ZoomOutButton"
      onClick={() => onZoom('zoomed-out')}
      style={{
        pointerEvents: canZoomOut ? 'auto' : 'none'
      }}
    >
      <IconButton className={classes.iconButton} disabled={!canZoomOut}>
        <ZoomOut />
        <span className={classes.iconLabel}>Zoom out</span>
      </IconButton>
    </div>,
    <HomeButton />
  ]

  const trail = useTrail(items.length, {
    config: {
      duration: 1000,
      easing: easeCubicInOut
    },
    opacity: showControls ? 1 : 0,
    x: showControls ? 1 : 0,
    from: { opacity: 0, x: 0 },
  });

  return (
    <div className={classes.root}>
      {trail.map(({ x, ...rest }, index) => (
        <animated.div
          key={index}
          style={{ ...rest, transform: x.interpolate(x => `scale(${x})`) }}>
          {items[index]}
        </animated.div>
      ))}
    </div>
  );
};

export default Controls;
