var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

// center the drawing
var x = canvas.width / 2;
var y = canvas.height / 2;

// number of slices
var numerator = document.getElementById('numerator');

// number of colored slices
var denominator = document.getElementById('denominator');

// how thick you want a segment
var segmentDepth = 240;

function drawFraction() {
    context.clearRect(0,0, canvas.width, canvas.height)
    drawSegments(segmentDepth); 
}

function drawSegments(radius) {
    var pieAngle = 2 * Math.PI / denominator.value;

    for (var i = 0; i < denominator.value; i++) {
        context.beginPath();
        context.moveTo(x, y);
        context.arc(x, y, radius, i*pieAngle, (i+1)*pieAngle, false);
        context.lineWidth = segmentDepth;
        var hueValue = i * 15;
        if(i < numerator.value){
           context.fillStyle = 'hsl(' + hueValue + ',70%, 60%)';
           context.fill();
        }

        context.lineWidth = 2;
        context.strokeStyle = '#444';
        context.stroke();
    }
}

drawFraction()