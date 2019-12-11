import React from 'react';
import { OpenSeadragon } from "../OpenSeadragon";

const osdOpts = {
  visibilityRatio: 1,
  defaultZoomLevel: 0,
  maxZoomLevel: 3,
  showFullPageControl: false,
  showHomeControl: false,
  navImages: {
    zoomIn: "",
    zoomOut: "",
    home: ""
  },
  zoomInButton: "ZoomInButton",
  zoomOutButton: "ZoomOutButton",
  viewportMargins: {
    left: 420,
    top: 100,
    right: 20,
    bottom: 100
  },
  zoomPerScroll: 2,
  minZoomImageRatio: 1,
};

const osdStyle = {
  height: "100%",
  width: "100%"
}

const OpenSeadragonContainer = ({ url, ...props }) => {
  return (
    <OpenSeadragon
      style={osdStyle}
      tileSources={{ type: "image", url }}
      {...props}
      {...osdOpts}
    />
  )
}

export default OpenSeadragonContainer;
