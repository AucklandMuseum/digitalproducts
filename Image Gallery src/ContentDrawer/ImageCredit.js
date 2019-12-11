import React, { useContext } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useSpring, animated } from 'react-spring';
import { AppContext } from '../App/AppContext';

const useStyles = makeStyles(theme => ({
  copyright: {
    position: 'absolute',
    left: 40,
    bottom: 40,
    fontSize: 12,
    zIndex: 270
  }
}))

const ImageCredit = ({ copyright }) => {
  const classes = useStyles();
  const [state] = useContext(AppContext);
  const props = useSpring({
    bottom: state.viewerExpanded ? 40 : -170,
    opacity: state.viewerExpanded ? 1 : 0,
    from: { bottom: 170, opacity: 0 },
    delay: 400,
  })

  return (
    <animated.div
      className={classes.copyright}
      style={props}
    >
      {copyright}
    </animated.div>
  )
}

export default ImageCredit;
