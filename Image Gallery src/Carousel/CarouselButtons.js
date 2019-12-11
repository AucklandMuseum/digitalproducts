import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  iconButton: {
    background: "none",
    "&:hover": {
      background: "none"
    }
  }
}));

export const PrevButton = ({ onClick }) => {
  const classes = useStyles();
  return (
    <IconButton
      className={classes.iconButton}
      onClick={onClick}
    >
      <svg width="40" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.799 8.93H39.38v2H3.797l7.517 7.515-1.415 1.415L0 9.96l.03-.03L0 9.9 9.9 0l1.414 1.414L3.799 8.93z" fill="#313131" fillRule="nonzero" />
      </svg>
    </IconButton>
  );
};

export const NextButton = ({ onClick }) => {
  const classes = useStyles();
  return (
    <IconButton
      className={classes.iconButton}
      onClick={onClick}
    >
      <svg width="40" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M35.582 10.93H0v-2h35.583l-7.516-7.516L29.48 0l9.9 9.9-.031.03.03.03-9.9 9.9-1.413-1.415 7.515-7.515z" fill="#313131" fillRule="nonzero" />
      </svg>
    </IconButton>
  );
};
