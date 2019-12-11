import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { AppContext } from "../App/AppContext";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  button: {
    marginLeft: theme.spacing(1),
    minWidth: 90
  }
}));

const LanguageToggle = () => {
  const classes = useStyles();
  const [state, setState] = useContext(AppContext);
  const { cultureNames, currentCultureName } = state;

  const onChange = name => {
    setState(state => ({
      ...state,
      currentCultureName: name
    }));
  }

  return cultureNames.length > 1 && (
    <div className={classes.root}>
      {cultureNames.map(name => {
        return (
          <Button
            key={name}
            className={`${classes.button} ${name === currentCultureName && 'active'}`}
            onClick={() => onChange(name)}
          >
            {name}
          </Button>
        );
      })}
    </div>
  );
};

export default LanguageToggle;
