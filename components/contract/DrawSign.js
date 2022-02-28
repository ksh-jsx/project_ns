import React, { useState,createRef, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import signForm from "./signForm.png"
import $ from "jquery";
window.$ = $;

function App() {

  let canvas
  let ctx
  
  let canvasRef = createRef()

  let base64Data;

  const [winWidth, setWinWidth] = useState(window.innerWidth < 520 ? window.innerWidth/10*8 : 520);
  const [winHeight, setWinHeight] = useState(window.innerWidth < 520 ? window.innerWidth/10*8 : 520);
  const [imgName, setImgName] = useState("");
  const [baseImgSrc, setBaseImgSrc] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const curr_url = document.URL; 
  const new_curr_url = new URL(curr_url); 
  const param = new_curr_url.searchParams.get("q");
  const param2 = new_curr_url.searchParams.get("name");

  let pos = {
    drawable: false,
    x: -1,
    y: -1
  }

  const getPosition = e => {
    if (e.offsetX || e.offsetX == 0) {
      return {
        x: e.offsetX,
        y: e.offsetY
      }
    }
    else if (e.targetTouches[0] || e.targetTouches[0].pageX == 0) {
      return {
        x: e.targetTouches[0].pageX - (document.body.offsetWidth - canvas.width) / 2,
        y: e.targetTouches[0].pageY - 50 //top margin
      }
    }
  }

  const initDraw = e => {
    $('html, body').css({'overflow': 'hidden'});
    ctx.beginPath()
    pos = {
      drawable: true,
      ...getPosition(e)
    }
    ctx.moveTo(pos.x, pos.y)
  }

  const reset = e => {
    // canvas
    canvas = canvasRef.current
    ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height) 
    }
    img.src = signForm
    document.getElementById('resetBtn').style.display="none";
  }

  const draw = e => {
    if (pos.drawable) {
      pos = {
        ...pos,
        ...getPosition(e)
      }
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
    }
  }

  const finishDraw = () => {
    $('html, body').css({'overflow': 'auto'});
    pos = {
      drawable: false,
      x: -1,
      y: -1
    }
    document.getElementById('resetBtn').style.display="block";

    let canvas = document.getElementById('canvas');
    setImgSrc(canvas.toDataURL());
  }

  const updateDimesions = () => {
    
    window.innerWidth < 520 ? setWinWidth(window.innerWidth/10*8) : setWinWidth(520)
    window.innerWidth < 520 ? setWinHeight(window.innerWidth/10*8) : setWinHeight(520)
    
      
    $('#resetBtn').trigger("click");
  };

  const imgCapture = () => {
    
    if (window.confirm("이대로 저장하겠습니까?") === true){
      document.getElementById("sbmBtn").click()

    }
    
  }

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setImgName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();    
    const formData = new FormData();
    formData.append('new_image', imgSrc)
    formData.append('base_image', baseImgSrc)
    formData.append('name', imgName)
    fetch('/api/contract2', {
      method: 'POST',
      body: formData,
    })
    .then((res) => res.json())
    .then((result) => {
      console.log(result)
      window.location.reload()
    })
    .catch((err) => console.log('error'))
    
    
  };
  useEffect(() => {

    canvas = canvasRef.current
    ctx = canvas.getContext("2d")

    setBaseImgSrc(param)
    setImgName(param2)

    let img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height) 
    }
    img.src=signForm
    canvas.addEventListener("mousedown", initDraw)
    canvas.addEventListener("mousemove", draw)
    canvas.addEventListener("mouseup", finishDraw)
    canvas.addEventListener("mouseout", finishDraw)
    canvas.addEventListener("touchstart", initDraw)
    canvas.addEventListener("touchmove", draw)
    canvas.addEventListener("touchend", finishDraw)
    window.addEventListener("resize", updateDimesions);

    $('#resetBtn').hide();
    
    
  }, []);
  
  return (
    <>
      <canvas ref={canvasRef} width={winWidth} height={winHeight} style={{position: 'relative', left:'50%',top:50, transform:'translateX(-50%)',border:'1px solid #bdbdbd',padding:'16px'}} id="canvas">
        <img src={signForm} />
      </canvas>
      <br/><br/><br/>
      <form onSubmit={onSubmit}>
        <Button
          variant="contained"
          color="default"
          onClick={reset}
          style={{position: 'relative', left:'50%', transform:'translateX(-50%)'}}
          id="resetBtn"
        >다시 싸인하기</Button>
        <br/><br/><br/>
        <TextField required id="standard-required" label="파일명" onChange={onChange} value={imgName} style={{position: 'relative', left:'50%', transform:'translateX(-50%)'}}/>
        <br/><br/><br/>
        <Button
          variant="contained"
          color="primary"
          onClick={imgCapture}
          className="captureBtn"
          style={{position: 'relative', left:'50%', transform:'translateX(-50%)'}}
        >싸인 저장</Button>
        <input type="submit" style={{display: 'none'}} id="sbmBtn"/>  
      </form>
      <br/><br/><br/>
    </>
  );
}

export default App;