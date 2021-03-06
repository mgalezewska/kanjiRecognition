/**
 * Created by galezewska on 2016-05-31.
 */

var canvas = document.getElementById('boardKanji');
var canvasSVGContext = new CanvasSVG.Deferred();
canvasSVGContext.wrapCanvas(canvas);
var ctx = canvas.getContext('2d');


var painting = document.getElementById('board');
var paint_style = getComputedStyle(painting);
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

var mouse = {x: 0, y: 0};

canvas.addEventListener('mousemove', function(e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
}, false);

ctx.lineWidth = 3;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = '#00CC99';

canvas.addEventListener('mousedown', function(e) {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);

    canvas.addEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
    var svg = document.getElementById("svgKanji");
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }

    svg.appendChild(ctx.getSVG());
}, false);

var onPaint = function() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
};