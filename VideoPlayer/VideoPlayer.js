import react from 'react'
import { Player, ControlBar, VolumeMenuButton, PlayToggle, Shortcut } from 'video-react'

const VideoPlayer = () => {
 return (
          <Player
            autoPlay
            src=''
            className='video-player fade-in-video'
            >
            <Shortcut clickable={false} />
          <ControlBar autoHide={true} >
           <PlayToggle />
            <VolumeMenuButton vertical />
          </ControlBar>
     </Player>
  )
}