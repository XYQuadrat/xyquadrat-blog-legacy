var circleCanvas = document.getElementById('circleCanvas');
var rectCanvas = document.getElementById('rectCanvas');
var lineCanvas = document.getElementById('lineCanvas');
var line = lineCanvas.getContext('2d');
var circle = circleCanvas.getContext('2d');
var rect = rectCanvas.getContext('2d');

// number of slices
var numerator = document.getElementById('numerator');

// number of colored slices
var denominator = document.getElementById('denominator');

// how thick you want a segment
var segmentDepth = 240;

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('numerator').addEventListener('change', drawFraction);
    document.getElementById('denominator').addEventListener('change', drawFraction);
    document.getElementById('downloadCircleImg').addEventListener('click', downloadCircle, false);
    document.getElementById('downloadRectImg').addEventListener('click', downloadRect, false);
    document.getElementById('downloadLineImg').addEventListener('click', downloadLine, false);
})

function drawFraction() {
    circle.clearRect(0, 0, circleCanvas.width, circleCanvas.height)
    rect.clearRect(0, 0, rectCanvas.width, rectCanvas.height);
    line.clearRect(0, 0, lineCanvas.width, lineCanvas.height);

    drawCircle(segmentDepth);
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
        circle.lineWidth = segmentDepth;
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
    var lineLength = lineCanvas.width - 10;
    var marginLeft = 5;

    line.strokeStyle = '#444';
    line.lineWidth = 2;
    line.beginPath();
    line.moveTo(marginLeft, lineCanvas.height/2);
    line.lineTo(marginLeft + lineLength, lineCanvas.height/2);
    line.stroke();

    line.beginPath();
    line.moveTo(marginLeft, lineCanvas.height/2);
    line.lineTo(marginLeft + Math.min(lineLength / denominator.value * numerator.value, lineLength), lineCanvas.height/2);
    line.strokeStyle = 'hsl(40,70%, 60%)';
    line.stroke();

    for(var i = 0; i <= denominator.value; ++i) {
        line.beginPath();
        line.moveTo(marginLeft + i * lineLength / denominator.value, lineCanvas.height /2 - 6);
        line.lineTo(marginLeft + i * lineLength / denominator.value, lineCanvas.height /2 + 6);
        line.strokeStyle = '#444';
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

function downloadCircle(){
    var data = circleCanvas.toDataURL('image/png');
    this.href = data;
}

function downloadRect() {
    var data = rectCanvas.toDataURL('image/png');
    this.href = data;
}

function downloadLine() {
    var data = lineCanvas.toDataURL('image/png');
    this.href = data;
}

drawFraction()