/* dojo.js 5/30/2018 v1.0.0 */
/* Copyright © 2018 by CodeDojo and/or it's individual developers. All rights reserved.
 * DO NOT REMOVE THIS NOTICE.
 */

// DOJOJS SYSTEM VARIABLES
// DO NOT EDIT!
let dojoJsRuntimeSystem = new DojoJSSystem();

let canvas;
let canvasContext;
let width;
let height;
let fps = 30;
let clock;
let paintFill = "rgba(0, 0, 0, 0)";
let paintStroke = "rgba(0, 0, 0, 1)";

let translationX;
let translationY;
let lineWidth = 1;
let rotateMode = 2 * Math.PI;
let rotation = 0; // In RADIANS no matter what.

let textSize = 16;

let mouseX = 0;
let mouseY = 0;
let keyCode;

const QUARTER_PI = .25 * Math.PI;
const HALF_PI = .5 * Math.PI;
const PI = Math.PI;
const TWO_PI = 2 * PI;
const TAU = TWO_PI;

const RADIANS = TWO_PI;
const DEGREES = 360;

const BACKSPACE = 0x08;
const TAB = 0x09;
const RETURN = 0x0A;
const ESCAPE = 0x1B;

const SPACE = 0x20;
const QUOTE = 0x27;
const COMMA = 0x2C;
const MINUS = 0x2D;
const PERIOD = 0x2E;
const SLASH = 0x2F;
const ZERO = 0x30;
const ONE = 0x31;
const TWO = 0x32;
const THREE = 0x33;
const FOUR = 0x34;
const FIVE = 0x35;
const SIX = 0x36;
const SEVEN = 0x37;
const EIGHT = 0x38;
const NINE = 0x39;

/**
 * Creates the canvas and canvas context used to draw on the window.
 * 
 * @param {number} windowWidth - The width of the canvas to be created.
 * @param {number} windowHeight - The height of the canvas to be created.
 * 
 * @returns {Object} The canavs element of the game. Useful if you want multiple canvases.
 * 
 * @see canvas
 * @see canvasContext
 * 
 * @author Adrian Gjerstad
 * @since 1.0.0
 */
function createCanvas(windowWidth, windowHeight) { 
  canvas = document.createElement("canvas");
  
  let widthAttr = document.createAttribute("width");
  let heightAttr = document.createAttribute("height");
  
  widthAttr.value = Math.abs(windowWidth);
  heightAttr.value = Math.abs(windowHeight);
  
  canvas.setAttributeNode(widthAttr);
  canvas.setAttributeNode(heightAttr);
  
  document.body.appendChild(canvas);
  
  canvasContext = canvas.getContext("2d");
  
  width = Math.abs(Math.floor(windowWidth));
  height = Math.abs(Math.floor(windowHeight));
  
  translationX = 0; // Start at left
  translationY = 0; // Start at top
  
  return canvas;
}

function getCanvasContextInstance() {
  return canvasContext;
}

function noFill() {
  paintFill = "rgba(0, 0, 0, 0)";
}

function noStroke() {
  paintStroke = "rgba(0, 0, 0, 0)";
}

function fill(red, green, blue, alpha) {
  red = clamp(red, 0, 255);
  green = clamp(green, 0, 255);
  blue = clamp(blue, 0, 255);
  alpha = clamp(alpha, 0, 255);
  
  if(red !== undefined && green === undefined && blue === undefined && alpha === undefined) {
    // Grayscale full alpha.
    
    paintFill = "rgba(" + red + ", " + red + ", " + red + ", 1)";
  } else if(red !== undefined && green !== undefined && blue === undefined && alpha === undefined) {
    // Grayscale depending alpha.
    
    paintFill = "rgba(" + red + ", " + red + ", " + red + ", " + map(green, 0, 255, 0, 1) + ")";
  } else if(red !== undefined && green !== undefined && blue !== undefined && alpha === undefined) {
    // RGB full alpha.
    
    paintFill = "rgba(" + red + ", " + green + ", " + blue + ", 1)";
  } else {
    // RGB depending alpha.
    
    paintFill = "rgba(" + red + ", " + green + ", " + blue + ", " + map(alpha, 0, 255, 0, 1) + ")";
  }
}

function stroke(red, green, blue, alpha) {
  red = clamp(red, 0, 255);
  green = clamp(green, 0, 255);
  blue = clamp(blue, 0, 255);
  alpha = clamp(alpha, 0, 255);
  
  if(red !== undefined && green === undefined && blue === undefined && alpha === undefined) {
    // Grayscale full alpha.
    
    paintStroke = "rgba(" + red + ", " + red + ", " + red + ", 1)";
  } else if(red !== undefined && green !== undefined && blue === undefined && alpha === undefined) {
    // Grayscale depending alpha.
    
    paintStroke = "rgba(" + red + ", " + red + ", " + red + ", " + map(green, 0, 255, 0, 1) + ")";
  } else if(red !== undefined && green !== undefined && blue !== undefined && alpha === undefined) {
    // RGB full alpha.
    
    paintStroke = "rgba(" + red + ", " + green + ", " + blue + ", 1)";
  } else if(red !== undefined && green !== undefined && blue !== undefined && alpha !== undefined) {
    // RGB depending alpha.
    
    paintStroke = "rgba(" + red + ", " + green + ", " + blue + ", " + map(alpha, 0, 255, 0, 1) + ")";
  } else {
    console.error("Inappropriate number of inputs");
  }
}

function strokeWeight(newWeight) {
  newWeight = Math.floor(Math.abs(newWeight));
  lineWidth = newWeight;
}

function angleMode(identifier) {
  if(identifier === DEGREES) {
    rotateMode = DEGREES;
  } else if(identifier === RADIANS) {
    rotateMode = RADIANS;
  } else {
    console.warn("Rotation style was not recognized and was not changed.");
  }
}

function degreesToRadians(deg) {
  deg = deg % 360; // Must limit degrees from 0 to 360.

  return map(deg, 0, 360, 0, TWO_PI);
}

function radiansToDegrees(rad) {
  rad = rad % TWO_PI; // Must limit radians from 0 to 2π.

  return map(rad, 0, TWO_PI, 0, 360);
}

function random(minimum, maximum) {
  if(minimum === undefined && maximum === undefined) {
    return random(0, 1);
  } else if(minimum !== undefined && maximum === undefined) {
    return random(0, minimum);
  } else if(minimum !== undefined && maximum !== undefined) {
    return Math.random(maximum - minimum) + minimum;
  } else {
    console.error("Parameter entries were insufficient.");
  }
}

function rotate(amount) {
  if(rotateMode === RADIANS) {
    rotation = amount;
  } else if(rotateMode === DEGREES) {
    rotation = degreesToRadians(amount);
  } else {
    console.warn("Could not read the angle mode. No rotation adjustments made.");
  }
}

function fontSize(size) {
  
  if(size > 5) {
    textSize = size;
  } else {
    console.log("Cannot go below 6pt.");
  }

}


// DRAW COMMANDS
function background(red, green, blue, alpha) {
  red = clamp(red, 0, 255);
  green = clamp(green, 0, 255);
  blue = clamp(blue, 0, 255);
  alpha = clamp(alpha, 0, 255);

  if(red !== undefined && green === undefined && blue === undefined && alpha === undefined) {
    // Grayscale full alpha.
    
    canvasContext.fillStyle = "rgba(" + red + ", " + red + ", " + red + ", 1)";
  } else if(red !== undefined && green !== undefined && blue === undefined && alpha === undefined) {
    // Grayscale depending alpha.

    canvasContext.fillStyle = "rgba(" + red + ", " + red + ", " + red + ", " + map(green, 0, 255, 0, 1) + ")";
  } else if(red !== undefined && green !== undefined && blue !== undefined && alpha === undefined) {
    // RGB full alpha.

    canvasContext.fillStyle = "rgba(" + red + ", " + green + ", " + blue + ", 1)";
  } else if(red !== undefined && green !== undefined && blue !== undefined && alpha !== undefined) {
    // RGB depending alpha.

    canvasContext.fillStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + map(alpha, 0, 255, 0, 1) + ")";
  } else {
    console.error("Color values were innapropriate. Minimum parameters: 1, Maximum parameters: 4");
  }

  canvasContext.beginPath();
  canvasContext.moveTo(0, 0);
  canvasContext.lineTo(0, height);
  canvasContext.lineTo(width, height);
  canvasContext.lineTo(width, 0);
  canvasContext.fill();
}

function setPixel(x, y, red, green, blue, alpha) {
  red = clamp(red, 0, 255);
  green = clamp(green, 0, 255);
  blue = clamp(blue, 0, 255);
  alpha = clamp(alpha, 0, 255);
  
  canvasContext.fillStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + map(alpha, 0, 255, 0, 1) + ")";
  canvasContext.fillRect(x, y, 1, 1);
}

function point(x, y) {
  canvasContext.strokeStyle = paintStroke;
  canvasContext.beginPath();
  canvasContext.arc(x + translationX, y + translationY, lineWidth, 0, TWO_PI);
  canvasContext.fill();
}

function line(x1, y1, x2, y2) {
  canvasContext.rotate(rotation);
  
  canvasContext.strokeStyle = paintStroke;
  canvasContext.lineWidth = lineWidth;
  canvasContext.beginPath();
  canvasContext.moveTo(x1 + translationX, y1 + translationY);
  canvasContext.lineTo(x2 + translationX, y2 + translationY);
  canvasContext.stroke();
  
  canvasContext.rotate(-rotation); // Reset rotation
}

function rect(x, y, rectWidth, rectHeight) {
  canvasContext.rotate(rotation);
  
  canvasContext.strokeStyle = paintStroke;
  canvasContext.lineWidth = lineWidth;
  canvasContext.beginPath();
  canvasContext.moveTo(x + translationX, y + translationY);
  canvasContext.lineTo(x + rectWidth + translationX, y + translationY);
  canvasContext.lineTo(x + rectWidth + translationX, y + rectHeight + translationY);
  canvasContext.lineTo(x + translationX, y + rectHeight + translationY);
  canvasContext.lineTo(x + translationX, y + translationY);
  canvasContext.stroke();

  canvasContext.fillStyle = paintFill;
  canvasContext.lineWidth = 1;
  canvasContext.beginPath();
  canvasContext.moveTo(x + translationX + lineWidth, y + translationY + lineWidth);
  canvasContext.lineTo(x + translationX + rectWidth - lineWidth, y + translationY + lineWidth);
  canvasContext.lineTo(x + translationX + rectWidth - lineWidth, y + translationY + rectHeight - lineWidth);
  canvasContext.lineTo(x + translationX + lineWidth, y + translationY + rectHeight - lineWidth);
  canvasContext.lineTo(x + translationX + lineWidth, y + translationY + lineWidth);
  canvasContext.fill();
  
  canvasContext.rotate(-rotation);
}

function ellipse(centerX, centerY, radiusX, radiusY) {
  canvasContext.rotate(rotation);
  
  if(centerX !== undefined && centerY !== undefined && radiusX !== undefined && radiusY === undefined) {
    radiusY = radiusX; // enables drawing circles with one radius entry.
  }

  canvasContext.strokeStyle = paintStroke;
  canvasContext.lineWidth = lineWidth;
  canvasContext.beginPath();
  canvasContext.ellipse(centerX + translationX, centerY + translationY, radiusX, radiusY, 0, 0, TWO_PI);
  canvasContext.stroke();

  canvasContext.fillStyle = paintFill;
  canvasContext.lineWidth = 1;
  canvasContext.beginPath();
  canvasContext.ellipse(centerX + translationX, centerY + translationY, radiusX - (2 * lineWidth), radiusY - (2 * lineWidth), 0, 0, TWO_PI);
  canvasContext.fill();
  
  canvasContext.rotate(-rotation);
}

function arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise) {
  canvasContext.rotate(rotation);
  
  canvasContext.strokeStyle = paintStroke;
  canvasConetxt.lineWidth = lineWidth;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, (rotateMode === RADIANS) ? startAngle : degreesToRadians(startAngle), (rotateMode === RADIANS) ? endAngle : degreesToRadians(endAngle), anticlockwise);
  canvasContext.stroke();

  canvasContext.fillStyle = paintFill;
  canvasContext.lineWidth = 1;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius - (2 * lineWidth), (rotateMode === RADIANS) ? startAngle : degreesToRadians(startAngle), (rotateMode === RADIANS) ? endAngle : degreesToRadians(endAngle), anticlockwise);
  canvasContext.fill();
  
  canvasContext.rotate(-rotation);
}

function text(string, x, y) {
  canvasContext.rotate(rotation);
  
  canvasContext.strokeStyle = paintStroke;
  canvasContext.lineWidth = lineWidth;
  canvasContext.fillStyle = paintFill;
  canvasContext.font = textSize + "pt Arial";
  canvasContext.fillText(string, x, y);
  canvasContext.strokeText(string, x, y);
  
  canvasContext.rotate(-rotation);
}

// THREAD METHODS
function wait(millis, func) {
  if(millis > 0) {
    try {
      setTimeout(millis, func);
    } catch(e) {
      console.error("Second parameter was not a function.");
    }
  } else {
    console.error("Wait time cannot be zeroed or negative. Got: " + millis);
  }
}

function frames(newFps) {
  if(newFps > 0) {
    fps = newFps;
    clearInterval(clock);
    clock = setInterval(1000/fps, paint);
  } else if(newFps >= 60) {
    console.warn("Your browser may slow down due to high loop rates.");
  } else {
    console.error("Cannot enter a zeroed or negative value. Got: " + newFps);
  }
}

/**
 * @author Lance Gjerstad
 * @author Adrian Gjerstad
 */
function map(value, valueMinimum, valueMaximum, returnMinimum, returnMaximum) {
  if(value < valueMinimum || value > valueMaximum)
    console.warn("Value input is out of range and may produce unexpected results.");
  if(valueMinimum > valueMaximum)
    console.error("Minimum input value cannot be greater than maximum input value.");
  if(valueMinimum > returnMinimum && valueMaximum < returnMaximum)
    console.warn("Input and target ranges are inverted. This may produce unwanted results.");
  
  return ((value - valueMinimum) * (returnMaximum - returnMinimum) / (valueMaximum - valueMinimum)) + returnMinimum;
}

function clamp(value, minimum, maximum) {
  if(minimum > maximum)
    console.warn("Minimum entry is larger than the maximum entry.");
  
  if(value < minimum)
    return minimum;
  else if(value > maximum)
    return maximum;
  else
    return value;
}

class DojoJSSystem {
  
  constructor() {
    
  }

  initializeEventHandlers() {
    
    if(canvas !== undefined && canvas !== null) {
      
      try {
        
        // Mouse events
        canvas.addEventListener("click", mouseClicked);
        canvas.addEventListener("dblclick", mouseDoubleClicked);
        canvas.addEventListener("mouseover", mouseOver);
        canvas.addEventListener("mouseout", mouseOut);
        canvas.addEventListener("wheel", middleMouseButtonClicked);
        canvas.addEventListener("auxclick", nonPrimaryMouseButtonClicked);
        canvas.addEventListener("mousedown", mousePressed);
        canvas.addEventListener("mouseup", mouseReleased);
        canvas.addEventListener("contextmenu", rightMouseButtonClicked);

        // Keyboard events
        canvas.addEventListener("keydown", keyPressed);
        canvas.addEventListener("keypress", keyDown);
        canvas.addEventListener("keyup", keyReleased);
        
      } catch(e) {
        
      }
    }

  }
  
  systemPropertyClock() {
    
  }

}

window.onload = function() {
  try {
    
    setup();
    
    clock = setInterval(1000/fps, paint);

  } catch(e) {
    //console.info("Not every command is used.");
  }
}

