import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
let start = new Date().getTime();

const originPosition = { x: 0, y: 0 };


const last = {
  Timestamp: start,
  pawPosition: originPosition,
}

const calcDistance = (a, b) => {
  const diffX = b.x - a.x,
    diffY = b.y - a.y;

  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
}


const updateLastPaw = position => {
  last.pawPosition = position;
}


const withUnit = (value, unit) => `${value}${unit}`,
  px = value => withUnit(value, "px")

const appendElement = (ele) => {
  document.body.appendChild(ele);
}

const removeElement = (ele, time) => {
  setTimeout(() => document.body.removeChild(ele), time)
}


const createPaw = (pos) => {
  const paw = document.createElement("span")
  paw.className = "paw fa-solid fa-paw"
  paw.style.left = px(pos.x);
  paw.style.top = px(pos.y);
  paw.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
    appendElement(paw);
  removeElement(paw, 1500);

}
const createPawStatic = (pos) => {
  const paw = document.createElement("span")
  paw.className = "paw fa-solid fa-paw static"
  // paw.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
  paw.style.transform=`rotate(-45deg)`

  paw.style.left = px(pos.x);
  paw.style.top = px(pos.y);
  appendElement(paw);
  removeElement(paw, 7000);

}

const handleMove = (e) => {
  const mousepos = { x: e.clientX + window.scrollX, y: e.clientY + window.scrollY }

  const hasMovedFarEnough = calcDistance(last.pawPosition, mousepos) >= 75

  const notclosetoedge=Math.abs(window.innerWidth-mousepos.x)>50 && Math.abs(window.innerHeight-mousepos.y)>100

  if (hasMovedFarEnough && notclosetoedge) {
    createPaw(mousepos);
    updateLastPaw(mousepos);
  }
}
const handleClickPaw=(e)=>{
  const mousepos = { x: e.clientX + window.scrollX, y: e.clientY + window.scrollY }
  const notclosetoedge = Math.abs(window.innerWidth - mousepos.x) > 50 && Math.abs(window.innerHeight - mousepos.y) > 100
  if(notclosetoedge){
    createPawStatic(mousepos);
  }

}

// const handleScroll = () => {
//   const adjustedX = last.pawPosition.x;
//   const adjustedY = last.pawPosition.y + window.scrollY;

//   createPaw({ x: adjustedX, y: adjustedY });
//   updateLastPaw({ x: adjustedX - window.scrollX, y: adjustedY - window.scrollY });


// };


window.onmousemove = e => handleMove(e);
window.onclick=e=>handleClickPaw(e);

createRoot(document.getElementById('root')).render(
  <BrowserRouter
    future={{
      v7_startTransition: true,      // Opt-in to transition state updates
      v7_relativeSplatPath: true,     // Opt-in to new splat route behavior
    }}>
    <App />
  </BrowserRouter>
)
