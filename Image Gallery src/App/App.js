import React, { useContext } from "react";
import find from 'lodash.find';
import { AppContext } from "./AppContext";
import Home from '../Home/Home';
import Loading from "../Loading";
import Gallery from '../Gallery/Gallery';

const App = () => {
  const [state] = useContext(AppContext);

  const {
    galleries,
    currentCultureName,
    currentSlide,
  } = state;

  const galleryData = find(galleries, ["cultureName", currentCultureName]);
  const isLoading = !galleryData;

  return (
    isLoading
    ? <Loading />
    : currentSlide !== undefined
      ? <Gallery {...galleryData} />
      : <Home {...galleryData} />
  )
}

export default App;
