import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSpring, useTrail, animated } from 'react-spring';
import { easeCubicInOut } from 'd3-ease';
import { AppContext } from "../App/AppContext";

const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    flexShrink: 0,
    width: 400,
    zIndex: 400,
    paddingLeft: 40,
    paddingRight: 40,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.common.white,
    touchAction: 'none'
  },
  eolTitle: {
    '&, & *': {
      fontSize: 32,
      fontWeight: 700,
      lineHeight: '48px',
    }
  },
  eolText: {
    marginTop: 32,
    '&, & *': {
      fontSize: 20.8,
      lineHeight: '24.96px',
    },
    '& p': {
      marginTop: 14.56,
      marginBottom: 0
    }
  },
  folTitle: {
    '&, & *': {
      fontSize: 20.8,
      lineHeight: '20.8px',
    },
  },
  folText: {
    marginTop: 12,
    '&, & *': {
      fontSize: 16.96,
      lineHeight: '16.96px'
    }
  },
  collectionCredit: {
    marginTop: 12,
    '&, & *': {
      fontSize: 12.8,
      lineHeight: '15px'
    }
  },
  imageCredit: {
    fontSize: 12.8,
    marginTop: 80,
  }
}));

const ContentDrawer = ({ eoltitle, eoltext, title, text, credit, copyright }) => {
  const [state, setState] = useContext(AppContext);
  const classes = useStyles();

  const items = [
    // EOL title
    eoltitle && <div className={classes.eolTitle} dangerouslySetInnerHTML={{ __html: eoltitle }} />,

    // EOL text
    eoltext && <div className={classes.eolText} dangerouslySetInnerHTML={{ __html: eoltext }} />,

    // FOL title aka title
    <div className={classes.folTitle} dangerouslySetInnerHTML={{ __html: title }} />,

    // FOL text aka text
    <div className={classes.folText} dangerouslySetInnerHTML={{ __html: text }} />,

    // Credits
    <div className={classes.collectionCredit} dangerouslySetInnerHTML={{ __html: credit }} />,
    <div className={classes.imageCredit} dangerouslySetInnerHTML={{ __html: copyright }} />,
  ];

  const trail = useTrail(items.length, {
    config: { mass: 1, tension: 220, friction: 40 },
    opacity: 1,
    x: 0,
    from: { opacity: 0, x: 100 },
    delay: 2200
  })

  const spring = useSpring({
    transform: state.drawerOpen ? "translateX(0%)" : "translateX(-100%)",
    delay: state.drawerOpen && state.isFirstLoad ? 1800 : 0,
    config: {
      duration: 1000,
      easing: easeCubicInOut
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setState(state => ({
        ...state,
        isFirstLoad: false
      }))
    }, 4000);

    return () => clearTimeout(timeout);
  }, [])

  return (
    <animated.div
      className={classes.root}
      style={spring}
    >
      {trail.map(({ x, ...rest }, index) => (
        <animated.div
          key={index}
          style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
          {items[index]}
        </animated.div>
      ))}
    </animated.div>
  );
};

export default ContentDrawer;
