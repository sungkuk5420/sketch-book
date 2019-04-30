const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const clrea = document.getElementById("jsClrea");

let INTIIAL_COLOR = "#2c2c2c";

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INTIIAL_COLOR;
ctx.fillStyle = INTIIAL_COLOR;
ctx.lineWidth = 5;

let painting = false;
let filling = false;
let timer;

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
    if (!filling) {
      painting = true;
    } else {
      handleCanvasClick();
    }
}

function stopPainting(event) {
    painting = false;
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function hendleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(event) {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(event) {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function hendleContextMenu(event) {
    event.preventDefault();
}

function hendleSaveClick(event) {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

function hendleClreaClick(event) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function hendleWindowResize() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
        console.log('resize');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }, 200);

}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("contextmenu", hendleContextMenu);
}

if (colors) {
    Array.from(colors).forEach(color =>
        color.addEventListener("click", handleColorClick)
    );
}

if (range) {
    range.addEventListener("input", hendleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (save) {
    save.addEventListener("click", hendleSaveClick);
}

if (clrea) {
    clrea.addEventListener("click", hendleClreaClick);
}

if (window) {
    window.addEventListener("resize", hendleWindowResize);
}
