
import React, { useEffect, useContext } from "react";
import { useSpring, animated } from 'react-spring';
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "../App/AppContext";
import Thumbnail from './Thumbnail';
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import { trackPageview } from '../utils/analytics';

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "#ededed",
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    fontSize: 42,
    fontWeight: 500,
    marginTop: 0,
    marginBottom: 0
  },
  text: {
    marginBottom: 20,
    '& *': {
      fontSize: 24,
      maxWidth: 'none',
    }
  },
  grid: {
    [theme.breakpoints.up("sm")]: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gridGap: 8,
      gridAutoRows: 0,
      margin: '0 auto',
      touchAction: 'pan-y'
    }
  },
  buttons: {
    position: 'absolute',
    bottom: 50,
    right: 40,
    zIndex: 300,
  }
}));

const Home = ({ title, text, items }) => {
  const classes = useStyles();
  const [state, setState] = useContext(AppContext);

  const rootSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  })

  const gridSpring = useSpring({
    x: 0,
    from: { x: 8 },
    config: {
      duration: 300
    },
  })

  useEffect(() => {
    setState(state => ({
      ...state,
      isFirstLoad: true
    }));

    trackPageview({
      content: {
        galleryName: title,
        screenName: ''
      },
      page: {
        environment: state.env.server,
        name: 'Home Screen'
      }
    })
  }, [])

  const onClick = index => {
    setState(state => ({
      ...state,
      currentSlide: index
    }));
  }

  return (
    <animated.div style={rootSpring} className={classes.root}>
      <div className={classes.header}>
        <h1 className={classes.title}>{title}</h1>
        <div className={classes.text} dangerouslySetInnerHTML={{ __html: text }} />
      </div>

      <animated.div
        className={classes.grid}
        style={{
          ...gridSpring,
          WebkitFilter: gridSpring.x.interpolate(x => `blur(${x}px)`)
        }}
      >
        {items.map((item, index) => <Thumbnail key={item.id} {...item} onClick={() => onClick(index)} />)}
      </animated.div>

      <div className={classes.buttons}>
        <LanguageToggle />
      </div>
    </animated.div>
  );
};

export default Home;
