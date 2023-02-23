import React, { useEffect, useRef, useState } from 'react'
import { SketchPicker } from 'react-color'
import "./CanvasElement.css"

const CanvasElement = () => {
  const [bgColor, setbgColor] = useState("#ffffff");
  const [palette, setPalette] = useState("palette1");
  const [number, setNumber] = useState(24);
  const [canvasWidth, setCanvasWidth] = useState(300);
  const [canvasHeight, setCanvasHeight] = useState(300);


  const canvasRef = useRef(null);
  //console.log("canvasRef",canvasRef)
  const numberRef = useRef(null);
  //console.log("numberRef",numberRef)
  const zoomRef = useRef(null);
  //console.log("zoomRef",zoomRef)


  // Handling Color Change Here 
  const handleColorChange = (color) => {
    setbgColor(color.hex);
  }

  // Handling Number Overlay Change Here
  const handleNumber = (e) => {
    setNumber(e.target.value);
    draw();
  }

  const draw = () => {
    const canvas = canvasRef.current;
    const number = numberRef.current;
    const ctx = canvas.getContext("2d");
    //console.log("ctx",ctx)
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "80px Arial";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(number.value, canvas.width / 2, canvas.height / 2);
  }

  useEffect(() => {
    draw();
  })

  // Handling Different Palette Colors 
  const handlePalette = (e) => {
    setPalette(e.target.value);
    const colors = {
      palette1: ["#ffffff", "#000000", "#ff0000", "#00ff00", "#0000ff"],
      palette2: ["#bdc3c7", "#7f8c8d", "#d7bde2", "#2c3e50", "#8e44ad"],
      palette3: ["#f8e4c3", "#aa6f2f", "#f9b894", "#dc7633", "#eb984e"],
      palette4: ["#800080"],
      palette5: ["#000080"],
      palette6: ["#00FF00"],
    }
    setbgColor(colors[e.target.value][0]);

  }

  // Handling the Hovering Effect Here
  const handleHover = (e) => {
    const number = numberRef.current;
    const zoom = zoomRef.current;
    const zoomFactor = 4;
    const zoomWidth = zoomFactor * number.clientWidth;
    const zoomHeight = zoomFactor * number.clientHeight;
    const canvas = canvasRef.current;
    const x =
      e.clientX -
      canvas.getBoundingClientRect().left -
      number.clientWidth / 2;
    const y =
      e.clientY -
      canvas.getBoundingClientRect().top -
      number.clientHeight / 2;
    const ctx = zoom.getContext("2d");
    ctx.drawImage(
      canvas,
      x,
      y,
      number.clientWidth,
      number.clientHeight,
      0,
      0,
      zoomWidth,
      zoomHeight
    );
    zoom.style.display = "block";
    zoom.style.left = `${e.clientX}px`;
    zoom.style.top = `${e.clientY}px`;
  }

  // Handling Canvas Size Change 
  const handleResize = () => {
    const canvas = canvasRef.current;
    setCanvasWidth(canvas.clientWidth);
    setCanvasHeight(canvas.clientHeight);
  }

  // Handling When Mouse Leaves The Canvas
  const handleLeave = () => {
    const zoom = zoomRef.current;
    zoom.style.display = "none";

  }
  return (
    <div className='mainContainer'>

      <canvas
        ref={canvasRef}
        style={{ backgroundColor: bgColor, borderRadius: "50%" }}
        width={canvasWidth}
        height={canvasHeight}
        onMouseMove={handleHover}
        onChange={handleLeave}
        onResize={handleResize}

      />
      <canvas
        ref={zoomRef}
        width={number * 4}
        height={number * 4}
        style={{ position: "absolute", display: "none", borderRadius: "50%" }}
      />

      <div className='leftContainer'>
        <div style={{ marginBottom: "50px" }}>
          <input
            type='number'
            value={number}
            onChange={handleNumber}
            ref={numberRef}
          />

          <select
            value={palette}
            onChange={handlePalette}
          >
            <option value="palette1">Palette 1</option>
            <option value="palette2">Palette 2</option>
            <option value="palette3">Palette 3</option>
            <option value="palette4">Palette 4</option>
            <option value="palette5">Palette 5</option>
            <option value="palette6">Palette 6</option>
          </select>
        </div>

        <SketchPicker
          color={bgColor}
          onChange={handleColorChange}
          className='colorPicker'
        />
      </div>
    </div>
  )
}

export default CanvasElement