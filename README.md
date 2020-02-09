# Digital Products
Please see the folders above for source files and SVGs of our digital products. We have also provided CSS code for UI elements below so you can apply it to button elements appropriately – if you're using react, you can copy + copy and paste the CSS. 


# Video Player
Here’s a link to the npm package https://www.npmjs.com/package/react-video-js-player the controls are built in, if using react. Otherwise this is the equivalent for html5 https://videojs.com/getting-started.
 
# Gotham Narrow Font
Font files in the file above, most are saved there. We don’t tend to use the Ultra of XLight
 
Have the snippets below from our website if it’s easier also.
 
 
@font-face {
  font-family: 'Gotham Narrow';
  font-style: normal;
  font-weight: 200;
  src: url("https://www.aucklandmuseum.com/AucklandMuseum/fonts/GothamNarrow-Light.woff2") format("woff2"), url("https://www.aucklandmuseum.com /AucklandMuseum/fonts/GothamNarrow-Light.woff") format("woff"); }
 
@font-face {
  font-family: 'Gotham Narrow';
  font-style: normal;
  font-weight: 400;
  src: url("https://www.aucklandmuseum.com /AucklandMuseum/fonts/GothamNarrow-Book.woff2") format("woff2"), url("https://www.aucklandmuseum.com /AucklandMuseum/fonts/GothamNarrow-Book.woff") format("woff"); }
 
@font-face {
  font-family: 'Gotham Narrow';
  font-style: normal;
  font-weight: 600;
  src: url("https://www.aucklandmuseum.com /AucklandMuseum/fonts/GothamNarrow-Medium.woff2") format("woff2"), url("https://www.aucklandmuseum.com /AucklandMuseum/fonts/GothamNarrow-Medium.woff") format("woff"); }
 
 
# Material ui theme wrapper

import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: "GothamNarrow"
  },
  palette: {
    primary: {
      main: "#222",
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  overrides: {
    MuiButton: {
      root: {
        fontSize: 14,
        fontWeight: 500,
        borderRadius: 20,
        textTransform: 'none',
        '&.active': {
          color: '#fff',
          backgroundColor: '#313131',
        },
        '&:hover': {
          backgroundColor: 'transparent',
        }
      },
    },
    MuiIconButton: {
      root: {
        padding: 0,
        '&:hover': {
          backgroundColor: 'none'
        }
      }
    }
  }
});


# Home button: 

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
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


const HomeButton = () => {
  const classes = useStyles();
   return(
    <Button className={classes.homeButton} onClick={onHome}>
      <img className={classes.homeIcon} src={homeIcon} alt="" />
      <span className={classes.homeLabel}>Home</span>
    </Button>
  )
}

src={homeIcon} in the image tag is the home icon svg


# Language buttons

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

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
  <Button
   key={name}
    className={classes.button}>
   {languageNameHere}
  </Button>
}


 
