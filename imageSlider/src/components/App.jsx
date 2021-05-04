import React from 'react'
import Slider from 'react-slick'
import ReactCompareImage from 'react-compare-image'

const imageData = window.__GALLERY_DATA__ || [];

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        imageId: 0
    }
  }

  componentDidMount() {
    console.log(document.getElementsByTagName('img'))
  }
  
  afterChangeHandler = (e) => {
    this.setState({imageId: e})
  }

render () {


const currentImageText = imageData.items.find(image => image.id === this.state.imageId)

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
    <div id="image-slider" className="image-slider-container"> 
    <h1 dangerouslySetInnerHTML={{ __html: imageData.title }}/>
    <br/>
     <Slider {...settings}>
      {imageData.items.map((img) => {
        return <div>
         <ReactCompareImage id={'slider' + img.id} leftImage={img.image1.original} rightImage={img.image2.original} sliderLineColor='rgba(255, 255, 255, 0.6)' sliderLineWidth={3} style={{boxShadow: 'none'}} handle={<img src="https://www.aucklandmuseum.com/getmedia/9f57c5a4-b04c-41bf-920e-f65e48671020/arrows" alt="arrows" style={{width: 30, height: 15, opacity: 0.65}}/>}/>
         </div>
      }
     )}

     </Slider>
     
    <div className="text-grid">
    <div className="col1"><p className="image-title" dangerouslySetInnerHTML={{ __html: currentImageText.image1.title }}/><p id="date" className="date" dangerouslySetInnerHTML={{ __html: currentImageText.image1.text }}/></div>
    <p className="caption1" dangerouslySetInnerHTML={{ __html: currentImageText.image1.caption}}/> 
    {/* <div style={{borderBottom: '1px solid #000', gridColumn: 1, gridRow: 3}} /> */}
    <p className="credit1" dangerouslySetInnerHTML={{ __html: currentImageText.image1.credit }}/>   
    <p className="copyright1" dangerouslySetInnerHTML={{ __html: currentImageText.image1.copyright }}/>
    <p className="link1" dangerouslySetInnerHTML={{ __html: currentImageText.image1.source }}/>
    <br/>
    <div className="col2"><p className="image-title" dangerouslySetInnerHTML={{ __html: currentImageText.image2.title }}/><p id="date" className="date" dangerouslySetInnerHTML={{ __html: currentImageText.image2.text }}/></div>
    <p className="caption2" dangerouslySetInnerHTML={{ __html: currentImageText.image2.caption}}/>
    {/* <div style={{borderBottom: '1px solid #000', gridColumn: 2, gridRow: 3}} /> */}
    <p className="credit2" dangerouslySetInnerHTML={{ __html: currentImageText.image2.credit }}/>
    <p className="copyright2" dangerouslySetInnerHTML={{ __html: currentImageText.image2.copyright }}/>
    <p className="link2" dangerouslySetInnerHTML={{ __html: currentImageText.image2.source }}/>
   </div>
   </div>
 
  )}
}

export default App

