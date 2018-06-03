/* dojo.js 5/30/2018 v1.0.0 */
/* Copyright © 2018 by CodeDojo and/or it's individual developers. All rights reserved.
 * DO NOT REMOVE THIS NOTICE.
 */

let _ = document; // Used for systematic purposes although can be used in dojo projects.
let $h = document.head;
let $b = document.body;

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
function createWindow(windowWidth, windowHeight) {
  canvas = _.createElement("canvas");
  
  let widthAttr = _.createAttributeNode("width");
  let heightAttr = _.createAttributeNode("height");
  
  widthAttr.value = Math.abs(windowWidth);
  heightAttr.value = Math.abs(windowHeight);
  
  canvas.setAttributeNode(widthAttr);
  canvas.setAttributeNode(heightAttr);
  
  $b.appendChild(canvas);
  
  canvasContext = canvas.getContext("2d");
  
  width = Math.abs(windowWidth);
  height = Math.abs(windowHeight);
  
  translationX = 0; // Start at left
  translationY = 0; // Start at top
  
  return canvas;
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
  } else {
    // RGB depending alpha.
    
    paintStroke = "rgba(" + red + ", " + green + ", " + blue + ", " + map(alpha, 0, 255, 0, 1) + ")";
  }
}


// DRAW COMMANDS
function setPixel(x, y, red, green, blue, alpha) {
  red = clamp(red, 0, 255);
  green = clamp(green, 0, 255);
  blue = clamp(blue, 0, 255);
  alpha = clamp(alpha, 0, 255);
  
  canvasContext.fillStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + map(alpha, 0, 255, 0, 1) + ")";
  canvasContext.fillRect(x, y, 0, 0);
}

function point(x, y) {
  canvasContext.fillStyle = paintStroke;
  canvasContext.
}

function wait(millis, func) {
  if(millis > 0) {
    setTimeout(millis, func);
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

window.onload = function() {
  try {
    
    setup();
    
    clock = setInterval(1000/fps, paint);
    
  } catch(e) {
    //console.info("Not every command is used.");
  }
}
