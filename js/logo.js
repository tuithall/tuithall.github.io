var svgns = "http://www.w3.org/2000/svg";
var twoPI = Math.PI * 2;

function ElectricLine() {
  var radius      = arguments.length <= 0 || arguments[0] === undefined ? 48 : arguments[0],
      startOffset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1],
      polyline    = document.createElementNS(svgns, 'polyline');

  var coords  = [],
      centerX = 50,
      centerY = 50;

  for (var i = 0; i <= twoPI + 0.1; i += 0.1) {
    coords.push(centerX + Math.sin(i + startOffset) * radius, centerY + Math.cos(i + startOffset) * radius);
  }

  // Slightly randomize the points
  function updateElectricLine() {
    polyline.setAttribute('points', coords.map(function (point, i) {
      return point + Math.random() * 3;
    }).join(' '));
  }

  polyline.style.animationDelay = '0s, ' + -Math.random() + 's';
  //polyline.style.animationDuration = (1.5 + Math.random()) + 's, ' + 0.2 + ( Math.random() * 0.4 ) + 's';

  updateElectricLine();

  // Have to get it in the dom for `getTotalLength` to work
  var tempSVG = document.createElementNS(svgns, 'svg');
  tempSVG.appendChild(polyline);
  document.body.appendChild(tempSVG);

  // Get the line length
  var length = polyline.getTotalLength();
  document.body.removeChild(tempSVG);

  // Set an accurate strokeDasharray & offset for the animation
  polyline.style.strokeDasharray = length / 2; //( length * 0.48 ) + ' ' + ( length * 0.52 );
  polyline.style.strokeDashoffset = -length;

  return {
    el: polyline,
    update: updateElectricLine
  };
}

var lines = [
  new ElectricLine(35, Math.PI * 0.0),
  new ElectricLine(34.5, Math.PI * 1.0),
  new ElectricLine(34, Math.PI * 0.25),
  new ElectricLine(33.5, Math.PI * 1.25),
  new ElectricLine(33, Math.PI * 0.5),
  new ElectricLine(32.5, Math.PI * 1.5)
];

var svg = document.querySelector('g'),
    t   = 0;

lines.forEach(function (line) {
  svg.appendChild(line.el);
});

function update() {
  requestAnimationFrame(update);

  if (t % 7 == 0) {
    lines.forEach(function (line) {
      line.update();
    });
  }

  t++;
}

update();