const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");

canvas.width = 700;
canvas.height = 700;
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 5;

let painting = false;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function startPainting(event) {
    console.log("start");
    painting = true;
}

function stopPainting(event) {
    console.log("stop");
    painting = false;
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

function hendleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

if (colors) {
    Array.from(colors).forEach(color =>
        color.addEventListener("click", handleColorClick)
    );
}

if (range) {
    range.addEventListener("input", hendleRangeChange);
}