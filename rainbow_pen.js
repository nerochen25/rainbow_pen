const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
const lineWidth = document.querySelector('.line-width-range');
const lightness = document.querySelector('.lightness-range');
const saturation = document.querySelector('.saturation-range');
const goBackBtn = document.querySelector('.go-back-btn');
const restartBtn = document.querySelector('.restart-btn');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 180;
ctx.strokeStyle = "#STAR";
// ctx.lineJoin = "round";
// ctx.lineCap = "round";
ctx.lineWidth = 20;
ctx.globalCompositeOperation = 'multiply';

let isDrawing = false,
    lastX = 0,
    lastY = 0,
    hue = 0,
    saturationVal = 100,
    lightnessVal = 75,
    direction = true;

lineWidth.value = ctx.lineWidth;
lightness.value = lightnessVal;
saturation.value = saturationVal;

lineWidth.addEventListener('change', (e) => {
    let newLineWidth = parseInt(e.target.value);
    ctx.lineWidth = newLineWidth;
});

saturation.addEventListener('change', (e) => {
    let newSaturation = e.target.value;
    saturationVal = newSaturation;
})

lightness.addEventListener('change', (e) => {
    let newLightness = e.target.value;
    lightnessVal = newLightness
});

function draw(e) {
    if (!isDrawing) return; //

    ctx.strokeStyle = `hsl(${hue}, ${saturationVal}%, ${lightnessVal}%)`; 
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];

    hue++;
    if (hue >= 360) {
        hue = 0;
    };

    // if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    //     direction = !direction;
    // }
    // if (direction) {
    //     // ctx.lineWidth++;
    // } else {
    //     // ctx.lineWidth--;
    // }
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];

});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

// goBackBtn.addEventListener('click', (e) => {
//     lastX = 0;
//     lastY = 0;
// })

restartBtn.addEventListener('click', () => {
    location.reload(true);
})