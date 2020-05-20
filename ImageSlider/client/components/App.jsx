import React from 'react'
import Slider from "react-slick"
import ReactCompareImage from 'react-compare-image'
import imageText from '../data/imageText'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        imageId: 0
    }
  }

  afterChangeHandler = (e) => {
    this.setState({imageId: e})
  }

render () {

  const currentImageText = imageText.images.find(image => image.id === this.state.imageId)

  const settings = {
    dots: true,
    infinite: true,
    touchMove: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: this.afterChangeHandler
  };



  return (
    <div className='container'>
    <Slider {...settings}>
      {/* 2 below are other slider options  */}
      {/* <div>
  <ReactCompareImage leftImage="AlbertOld.png" rightImage="AlbertNew.jpg" sliderLineColor='rgba(255, 255, 255, 0.6)' sliderLineWidth={3} style={{boxShadow: 'none'}} />
    </div> */}
        {/* <div>
    <ReactCompareImage leftImage="AlbertOld.png" rightImage="AlbertNew.jpg" sliderLineColor='rgba(255, 255, 255, 0.6)' sliderLineWidth={3} style={{boxShadow: 'none'}} handle={<button style={{background: '#ffffffa3', height: 5, border: 'none', width: 15}}></button>}/>
    </div> */}
    <div>
    <ReactCompareImage id="image0" leftImage="https://www.aucklandmuseum.com/getmedia/10e15b33-47e1-4f71-bb04-4127421822cd/AlbertOld" rightImage="https://www.aucklandmuseum.com/getmedia/39d1da38-bf10-4eea-83c9-5b649e6d6cc4/AlbertNew" sliderLineColor='rgba(255, 255, 255, 0.6)' sliderLineWidth={3} style={{boxShadow: 'none'}} handle={<img src="arrows.png" style={{width: 30, height: 15, opacity: 0.65}}/>}/>
    </div>
    <div>
    <ReactCompareImage id="image1" leftImage="https://www.aucklandmuseum.com/getmedia/a4d70535-e3bd-4384-b1e6-b3be2c3ae230/CornerofQueenandFortold" rightImage="https://www.aucklandmuseum.com/getmedia/5393cb61-2e30-4666-b3f6-e5a27b71c6f5/Cornerofqueenandfortnew" sliderLineColor='rgba(255, 255, 255, 0.6)' sliderLineWidth={3} style={{boxShadow: 'none'}} handle={<img src="arrows.png" style={{width: 30, height: 15, opacity: 0.65}}/>}/>
    </div>
    <div>
    <ReactCompareImage id="image2" leftImage="https://www.aucklandmuseum.com/getmedia/4bdef84a-8835-4830-a625-4a1abdc1d02c/GraftonOld" rightImage="https://www.aucklandmuseum.com/getmedia/00432c04-686f-491d-8d37-95b6ad06b8a7/GraftonNew" sliderLineColor='rgba(255, 255, 255, 0.6)' sliderLineWidth={3} style={{boxShadow: 'none'}} handle={<img src="arrows.png" style={{width: 30, height: 15, opacity: 0.65}}/>}/>
    </div>
    <div>
    <ReactCompareImage id="image3" leftImage="https://www.aucklandmuseum.com/getmedia/37959aa9-474c-4429-a8c3-727bf7d112fe/GreyStOld" rightImage="https://www.aucklandmuseum.com/getmedia/448fe2b1-78d7-4c78-8481-418e476c74a5/GreyStNew" sliderLineColor='rgba(255, 255, 255, 0.6)' sliderLineWidth={3} style={{boxShadow: 'none'}} handle={<img src="arrows.png" style={{width: 30, height: 15, opacity: 0.65}}/>}/>
    </div>
    <div>
    <ReactCompareImage leftImage="https://www.aucklandmuseum.com/getmedia/d819e502-0e97-4c7b-93a0-446175fdd848/HighStold" rightImage="https://www.aucklandmuseum.com/getmedia/d56121b4-b353-4233-ac9c-3cbc8f3a4bcc/HighStNew" sliderLineColor='rgba(255, 255, 255, 0.6)' sliderLineWidth={3} style={{boxShadow: 'none'}} handle={<img src="arrows.png" style={{width: 30, height: 15, opacity: 0.65}}/>}/>
    </div>
    <div>
    <ReactCompareImage leftImage="https://www.aucklandmuseum.com/getmedia/9710ffc9-4c58-4843-a303-6a2af51fd4e6/Karangahapeold" rightImage="https://www.aucklandmuseum.com/getmedia/505fe795-ba4c-4c2c-918f-4f0e6926e112/KarangahapeNew" sliderLineColor='rgba(255, 255, 255, 0.6)' sliderLineWidth={3} style={{boxShadow: 'none'}} handle={<img src="arrows.png" style={{width: 30, height: 15, opacity: 0.65}}/>}/>
    </div>
    <div>
    <ReactCompareImage leftImage="https://www.aucklandmuseum.com/getmedia/fc856142-0cdc-47cb-b0b4-316fc9bd8916/PittOld" rightImage="https://www.aucklandmuseum.com/getmedia/eaeecdbb-68f0-4ffe-bdb3-3ac1b42d3666/PittStNew" sliderLineColor='rgba(255, 255, 255, 0.6)' sliderLineWidth={3} style={{boxShadow: 'none'}} handle={<img src="arrows.png" style={{width: 30, height: 15, opacity: 0.65}}/>}/>
    </div>
    <div>
    <ReactCompareImage leftImage="https://www.aucklandmuseum.com/getmedia/15516dce-5008-46af-98e8-307d3b1463c3/QueenStcnrofcustomsold" rightImage="https://www.aucklandmuseum.com/getmedia/429f8685-078e-4ff8-bd01-4f4e7eba50e8/QueenStcnrofcustomsnew" sliderLineColor='rgba(255, 255, 255, 0.6)' sliderLineWidth={3} style={{boxShadow: 'none'}} handle={<img src="arrows.png" style={{width: 30, height: 15, opacity: 0.65}}/>}/>
    </div>
    <div>
    <ReactCompareImage leftImage="https://www.aucklandmuseum.com/getmedia/28e362ca-9578-47a9-bd94-3b5a48c32818/QueenStVulcanandDurhamOld" rightImage="https://www.aucklandmuseum.com/getmedia/b2118e9f-3d8b-4295-aca4-ae976fe9f581/QueenStVulcanandDurhamNew" sliderLineColor='rgba(255, 255, 255, 0.6)' sliderLineWidth={3} style={{boxShadow: 'none'}} handle={<img src="arrows.png" style={{width: 30, height: 15, opacity: 0.65}}/>}/>
    </div>
    <div>
    <ReactCompareImage leftImage="https://www.aucklandmuseum.com/getmedia/90745866-8f4d-4b7c-ae3e-2b709bd509bb/ShortlandQeenOld" rightImage="https://www.aucklandmuseum.com/getmedia/f16de480-ab2b-4c42-968e-7b4a754ae68b/ShortlandQueenNew" sliderLineColor='rgba(255, 255, 255, 0.6)' sliderLineWidth={3} style={{boxShadow: 'none'}} handle={<img src="arrows.png" style={{width: 30, height: 15, opacity: 0.65}}/>}/>
    </div>
    <div>
    <ReactCompareImage leftImage="https://www.aucklandmuseum.com/getmedia/5be9f5f8-eae1-4605-ae7d-2285fe0c1afd/SwansonQueenOld" rightImage="https://www.aucklandmuseum.com/getmedia/fe0615f5-a814-4160-bd4f-747f156931d9/SwansonQueenNew" sliderLineColor='rgba(255, 255, 255, 0.6)' sliderLineWidth={3} style={{boxShadow: 'none'}} handle={<img src="arrows.png" style={{width: 30, height: 15, opacity: 0.65}}/>}/>
    </div>
    <div>
    <ReactCompareImage leftImage="https://www.aucklandmuseum.com/getmedia/c713ff15-e6b6-4a75-a8b0-d813f02ad9bf/SymondsOld" rightImage="https://www.aucklandmuseum.com/getmedia/f70ed7c7-6f99-4cad-879b-93d823ee08aa/SymondsNew" sliderLineColor='rgba(255, 255, 255, 0.6)' sliderLineWidth={3} style={{boxShadow: 'none'}} handle={<img src="arrows.png" style={{width: 30, height: 15, opacity: 0.65}}/>}/>
    </div>
    <div>
    <ReactCompareImage leftImage="https://www.aucklandmuseum.com/getmedia/3fceb549-cb9c-43a5-940e-546aca8b6ad7/VictoriaandHonsonOld" rightImage="https://www.aucklandmuseum.com/getmedia/f5efdb0c-3890-4739-902a-537dea03a117/VictoriaandHobsonNewg" sliderLineColor='rgba(255, 255, 255, 0.6)' sliderLineWidth={3} style={{boxShadow: 'none'}} handle={<img src="arrows.png" style={{width: 30, height: 15, opacity: 0.65}}/>}/>
    </div>
    <div>
    <ReactCompareImage leftImage="https://www.aucklandmuseum.com/getmedia/a70e0d98-54e9-4b05-b66a-f96d2b33d857/VictoriaStOld" rightImage="https://www.aucklandmuseum.com/getmedia/2d1a1cb7-b0a7-4609-a0aa-0f11659df208/VictoriaStNew" sliderLineColor='rgba(255, 255, 255, 0.6)' sliderLineWidth={3} style={{boxShadow: 'none'}} handle={<img src="arrows.png" style={{width: 30, height: 15, opacity: 0.65}}/>}/>
    </div>
    <div>
    <ReactCompareImage leftImage="https://www.aucklandmuseum.com/getmedia/e7afed6b-1c88-44a0-89ba-07430b41420f/WyndhamQueenStOld" rightImage="https://www.aucklandmuseum.com/getmedia/3eb6dec4-d3f5-4dcb-8ea8-16585e356453/WyndhamStQueenNew" sliderLineColor='rgba(255, 255, 255, 0.6)' sliderLineWidth={3} style={{boxShadow: 'none'}} handle={<img src="arrows.png" style={{width: 30, height: 15, opacity: 0.65}}/>}/>
    </div>
    </Slider>
    <div className='text-grid'>
    <div className='col1'><p className='title1'>{currentImageText.title1}</p> <p id="date" className='date'>{currentImageText.date1}</p></div>
    <div className="credit1">{currentImageText.credit1}</div>
    <br/>
    <div className='col2'><p style={{float: 'left'}}>{currentImageText.title2}</p><p id="date" className='date'>{currentImageText.date2}</p></div>
    <div className="credit2">{currentImageText.credit2}</div>
   </div>
   </div>
  )}
}

export default App
