var circleCanvas = document.getElementById('circleCanvas');
var rectCanvas = document.getElementById('rectCanvas');
var lineCanvas = document.getElementById('lineCanvas');

var circle = circleCanvas.getContext('2d');
var rect = rectCanvas.getContext('2d');
var line = lineCanvas.getContext('2d');

// number of slices
var numerator = document.getElementById('numerator');

// number of colored slices
var denominator = document.getElementById('denominator');

// how thick you want a segment
var circleRadius = 240;

document.addEventListener('DOMContentLoaded', function () {
    numerator.addEventListener('change', drawFraction);
    denominator.addEventListener('change', drawFraction);
    document.getElementById('downloadCircleImg').addEventListener('click', function () { download(circleCanvas, "Circle"); }, false);
    document.getElementById('downloadRectImg').addEventListener('click', function () { download(rectCanvas, "Rect"); }, false);
    document.getElementById('downloadLineImg').addEventListener('click', function () { download(lineCanvas, "Line"); }, false);
});

function drawFraction() {
    // clear all canvasses
    circle.clearRect(0, 0, circleCanvas.width, circleCanvas.height)
    rect.clearRect(0, 0, rectCanvas.width, rectCanvas.height);
    line.clearRect(0, 0, lineCanvas.width, lineCanvas.height);

    drawCircle(circleRadius);
    drawRectangle();
    drawLine();
}

function drawCircle(radius) {
    var pieAngle = 2 * Math.PI / denominator.value;
    // center the drawing
    var x = circleCanvas.width / 2;
    var y = circleCanvas.height / 2;

    for (var i = 0; i < denominator.value; i++) {
        circle.beginPath();
        circle.moveTo(x, y);
        circle.arc(x, y, radius, i * pieAngle, (i + 1) * pieAngle, false);
        circle.lineWidth = circleRadius;
        setStyle(i, circle);
        circle.stroke();
    }
}

function drawRectangle() {
    let width = rectCanvas.width / denominator.value - 1;

    for (let i = 0; i < denominator.value; i++) {
        rect.beginPath();
        rect.rect(i * width + 1, rectCanvas.height / 4, width, rectCanvas.height / 2);

        setStyle(i, rect);
        rect.stroke();
    }
}

function drawLine() {
    const lineLength = lineCanvas.width - 10;
    const marginLeft = 5;
    const yHeight = lineCanvas.height / 2;

    line.strokeStyle = '#444';
    line.lineWidth = 2;
    line.beginPath();
    line.moveTo(marginLeft, yHeight);
    line.lineTo(marginLeft + lineLength, yHeight);
    line.stroke();

    let coloredParts = Math.min(numerator.value / denominator.value, 1);

    line.strokeStyle = 'hsl(40,70%, 60%)';

    line.beginPath();
    line.moveTo(marginLeft, yHeight);
    line.lineTo(marginLeft + lineLength * coloredParts, yHeight);
    line.stroke();

    for (var i = 0; i <= denominator.value; ++i) {
        line.strokeStyle = '#444';

        line.beginPath();
        line.moveTo(marginLeft + i * lineLength / denominator.value, yHeight - 6);
        line.lineTo(marginLeft + i * lineLength / denominator.value, yHeight + 6);
        line.stroke();
    }
}

function setStyle(i, context) {
    var hueValue = 40;
    if (i < numerator.value) {
        context.fillStyle = 'hsl(' + hueValue + ',70%, 60%)';
        context.fill();
    }

    context.lineWidth = 2;
    context.strokeStyle = '#444';
}

function download(canvas, type) {
    const data = canvas.toDataURL('image/png');

    var element = document.getElementById('download' + type + "Img");
    element.href = data;
    element.download = `Fraction_${numerator.value}_over_${denominator.value}_${type}.png`;
}

drawFraction()