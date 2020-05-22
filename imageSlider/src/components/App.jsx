import React from 'react'
import Slider from "react-slick"
import ReactCompareImage from 'react-compare-image'

const imageData = window.__IMAGE_DATA__ || [];
const pageData = window.__PAGE_DATA__ || [];

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

  const currentImageText = imageData.find(image => image.id === this.state.imageId)

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
    <h1 dangerouslySetInnerHTML={{ __html: pageData.title }}/>
    <br/>
     <Slider {...settings}>
      {imageData.map((img) => {
        return <div>
         <ReactCompareImage id={img.id} leftImage={img.image1} rightImage={img.image2} sliderLineColor='rgba(255, 255, 255, 0.6)' sliderLineWidth={3} style={{boxShadow: 'none'}} handle={<img src="arrows.png" alt="arrows" style={{width: 30, height: 15, opacity: 0.65}}/>}/>
         </div>
      }
     )}

     </Slider>
     <div className='text-grid'>
    <div className='col1'><p className='image-title' dangerouslySetInnerHTML={{ __html: currentImageText.title1 }}/><p id="date" className='date' dangerouslySetInnerHTML={{ __html: currentImageText.date1 }}/></div>
    <div className="caption1" dangerouslySetInnerHTML={{ __html: currentImageText.caption1}}/>
    <div className="credit1" dangerouslySetInnerHTML={{ __html: currentImageText.credit1 }}/>
    <div className="link1" dangerouslySetInnerHTML={{ __html: currentImageText.link1 }}/>
    <br/>
    <div className='col2'><p className="image-title" dangerouslySetInnerHTML={{ __html: currentImageText.title2 }}/><p id="date" className='date' dangerouslySetInnerHTML={{ __html: currentImageText.date2 }}/></div>
    <div className="caption2" dangerouslySetInnerHTML={{ __html: currentImageText.caption2}}/>
    <div className="credit2" dangerouslySetInnerHTML={{ __html: currentImageText.credit2 }}/>
    <div className="link2" dangerouslySetInnerHTML={{ __html: currentImageText.link2 }}/>
   </div>
   </div>
 
  )}
}

export default App
