var circleCanvas = document.getElementById('circleCanvas');
var rectCanvas = document.getElementById('rectCanvas');
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
    document.getElementById('denominator').addEventListener('change', drawFraction)
    document.getElementById('downloadCircleImg').addEventListener('click', downloadCircle, false);
    document.getElementById('downloadRectImg').addEventListener('click', downloadRect, false)
})

function drawFraction() {
    circle.clearRect(0, 0, circleCanvas.width, circleCanvas.height)
    rect.clearRect(0, 0, rectCanvas.width, rectCanvas.height);

    drawCircle(segmentDepth);
    drawRectangle();
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
    }
}

function drawRectangle() {
    let width = rectCanvas.width / denominator.value - 1;

    for (let i = 0; i < denominator.value; i++) {
        rect.beginPath();
        rect.rect(i * width + 1, rectCanvas.height / 4, width, rectCanvas.height / 2);

        setStyle(i, rect);
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
    context.stroke();
}

function downloadCircle(){
    var data = circleCanvas.toDataURL('image/png');
    this.href = data;
}

function downloadRect() {
    var data = rectCanvas.toDataURL('image/png');
    this.href = data;
}

drawFraction()