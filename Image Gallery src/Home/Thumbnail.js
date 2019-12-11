import React, { useState } from 'react';

const rowGap = 8;
const rowHeight = 0;

const Thumbnail = ({ id, onClick, thumb, title }) => {
  const [style, setStyle] = useState({ height: 'auto', gridRowEnd: 'span 1' })

  const onLoad = e => {
    const rowSpan = Math.ceil((e.target.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));

    setStyle({
      gridRowEnd: `span ${rowSpan}`,
      height: '100%'
    })
  }

  return (
    <div style={{
      gridRowEnd: style.gridRowEnd
    }}>
      <img
        onLoad={onLoad}
        onClick={onClick}
        src={thumb}
        alt={title}
        style={{
          height: style.height,
          width: "100%",
        }}
      />
    </div>
  )
}

export default Thumbnail;
