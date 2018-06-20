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
let keyCode = 0; // NULL or no key

const QUARTER_PI = .25 * Math.PI;
const HALF_PI = .5 * Math.PI;
const PI = Math.PI;
const TWO_PI = 2 * PI;
const TAU = TWO_PI;

const RADIANS = TWO_PI;
const DEGREES = 360;

// textAlign
const LEFT = "left";
const CENTER = "center";
const RIGHT = "right";

// keyCode Constants
const NO_KEY = 0;
const KEY_BREAK = 3;
const KEY_BACKSPACE = 8;
const KEY_TAB = 9;
const KEY_CLEAR = 12;
const KEY_ENTER = 13;
const KEY_SHIFT = 16;
const KEY_CONTROL = 17;
const KEY_ALT = 18;
const KEY_PAUSE = 19;
const KEY_CAPS_LOCK = 20;
const KEY_ESCAPE = 27;
const KEY_SPACE = 32;
const KEY_PAGE_UP = 33;
const KEY_PAGE_DOWN = 34;
const KEY_END = 35;
const KEY_HOME = 36;
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_SELECT = 41;
const KEY_PRINT = 42;
const KEY_EXECUTE = 43;
const KEY_PRINT_SCREEN = 44;
const KEY_INSERT = 45;
const KEY_DELETE = 46;
const KEY_HELP = 47;

const KEY_0 = 48;
const KEY_1 = 49;
const KEY_2 = 50;
const KEY_3 = 51;
const KEY_4 = 52;
const KEY_5 = 53;
const KEY_6 = 54;
const KEY_7 = 55;
const KEY_8 = 56;
const KEY_9 = 57;

const KEY_COLON = 58;

const KEY_A = 65;
const KEY_B = 66;
const KEY_C = 67;
const KEY_D = 68;
const KEY_E = 69;
const KEY_F = 70;
const KEY_G = 71;
const KEY_H = 72;
const KEY_I = 73;
const KEY_J = 74;
const KEY_K = 75;
const KEY_L = 76;
const KEY_M = 77;
const KEY_N = 78;
const KEY_O = 79;
const KEY_P = 80;
const KEY_Q = 81;
const KEY_R = 82;
const KEY_S = 83;
const KEY_T = 84;
const KEY_U = 85;
const KEY_V = 86;
const KEY_W = 87;
const KEY_X = 88;
const KEY_Y = 89;
const KEY_Z = 90;

const KEY_LEFT_COMMAND = 91;
const KEY_RIGHT_WINDOWS_KEY = 92;
const KEY_RIGHT_COMMAND = 93;
const KEY_SLEEP = 95;
const KEY_NUMPAD_0 = 96;
const KEY_NUMPAD_1 = 97;
const KEY_NUMPAD_2 = 98;
const KEY_NUMPAD_3 = 99;
const KEY_NUMPAD_4 = 100;
const KEY_NUMPAD_5 = 101;
const KEY_NUMPAD_6 = 102;
const KEY_NUMPAD_7 = 103;
const KEY_NUMPAD_8 = 104;
const KEY_NUMPAD_9 = 105;
const KEY_NUMPAD_MULTIPLY = 106;
const KEY_NUMPAD_ADD = 107;
const KEY_NUMPAD_PERIOD = 108;
const KEY_NUMPAD_SUBTRACT = 109;
const KEY_NUMPAD_DECIMAL = 110;
const KEY_NUMPAD_DIVIDE = 111;

const KEY_F1 = 112;
const KEY_F2 = 113;
const KEY_F3 = 114;
const KEY_F4 = 115;
const KEY_F5 = 116;
const KEY_F6 = 117;
const KEY_F7 = 118;
const KEY_F8 = 119;
const KEY_F9 = 120;
const KEY_F10 = 121;
const KEY_F11 = 122;
const KEY_F12 = 123;
const KEY_F13 = 124;
const KEY_F14 = 125;
const KEY_F15 = 126;
const KEY_F16 = 127;
const KEY_F17 = 128;
const KEY_F18 = 129;
const KEY_F19 = 130;
const KEY_F20 = 131;
const KEY_F21 = 132;
const KEY_F22 = 133;
const KEY_F23 = 134;
const KEY_F24 = 125;

const KEY_NUM_LOCK = 144;
const KEY_SCROLL_LOCK = 145;
const KEY_CIRCUMFLEX = 160;
const KEY_EXCLAMATION_POINT = 161;
const KEY_HASH = 163;
const KEY_POUND = 163; // Different names
const KEY_DOLLAR_SIGN = 164;
const KEY_PAGE_BACKWARD = 166;
const KEY_PAGE_FORWARD = 167;
const KEY_REFRESH = 168;
const KEY_CLOSING_PARENTHESIS = 169; // AZERTY layout
const KEY_ASTERISK = 170;
const KEY_MINUS_FIREFOX = 173;
const KEY_DECREASE_VOLUME = 174;
const KEY_INCREASE_VOLUME = 175;
const KEY_NEXT = 176;
const KEY_PREVIOUS = 177;
const KEY_STOP = 178;
const KEY_PLAY_PAUSE = 179;
const KEY_MUTE_UNMUTE_FIREFOX = 180;
const KEY_SEMICOLON = 186;
const KEY_EQUAL_SIGN = 187;
const KEY_COMMA = 188;
const KEY_DASH = 189;
const KEY_PERIOD = 190;
const KEY_SLASH = 191;
const KEY_GRAVE_ACCENT = 192;
const KEY_OPEN_BRACKET = 219;
const KEY_BACKSLASH = 220;
const KEY_CLOSE_BRACKET = 221;
const KEY_QUOTE = 222;
const KEY_COMMAND_FIREFOX = 224;

/**
 * Creates the canvas and canvas context used to draw on the window.
 * 
 * @param {number} windowWidth - The width of the canvas to be created.
 * @param {number} windowHeight - The height of the canvas to be created.
 * 
 * @returns {object} The canavs element of the game. Useful if you want multiple canvases.
 * 
 * @since 1.0.0
 */
function createCanvas(windowWidth, windowHeight) { 
  canvas = document.createElement("canvas");
  
  let widthAttr = document.createAttribute("width");
  let heightAttr = document.createAttribute("height");
  
  let unsupportedNode = document.createTextNode("Sorry! Your browser doesn't support the HTML5 <canvas> element.");

  widthAttr.value = Math.abs(windowWidth);
  heightAttr.value = Math.abs(windowHeight);
  
  canvas.setAttributeNode(widthAttr);
  canvas.setAttributeNode(heightAttr);

  canvas.appendChild(unsupportedNode);
  
  let mouseMovementHandler = document.createAttribute("onmousemove");
  mouseMovementHandler.value = "getMousePosition(event)";

  canvas.setAttributeNode(mouseMovementHandler);

  document.body.appendChild(canvas);

  canvasContext = canvas.getContext("2d");
  
  width = Math.abs(Math.floor(windowWidth));
  height = Math.abs(Math.floor(windowHeight));
  
  translationX = 0; // Start at left
  translationY = 0; // Start at top
  
  canvasContext.textBaseline = "middle";

  return canvas;
}

/**
 * Update the keyCode value every single time a keyboard button is pressed.
 * 
 * @param {object} e - The KeyboardEvent object used to get the details on the keyboard button presses.
 * 
 * @since 1.0.0
 */
function updateKeyCode(e) {
  keyCode = e.keyCode || e.which;
}

/**
 * Retrieve the canvasContext instance for linking between addons.
 * 
 * @returns {object} The CanvasDrawingContext2D object for drawing onto the canvas with raw commands.
 * 
 * @since 1.0.0
 */
function getCanvasContextInstance() {
  return canvasContext;
}

/**
 * Set the fill value to transparent black.
 */
function noFill() {
  paintFill = "rgba(0, 0, 0, 0)";
}

/**
 * Set the stroke value to transparent black.
 */
function noStroke() {
  paintStroke = "rgba(0, 0, 0, 0)";
}

/**
 * Set the fill color of the canvas drawing to what you wish.
 * If there are not four parameters inputted, this is what this method does:
 * <ol>
 *   <li>Sets to a color with a grayscale value.</li>
 *   <li>Sets to a color with a grayscale value with alpha.</li>
 *   <li>Sets to an RGB color with full alpha</li>
 * </ol>
 * 
 * @param {number} red - The red RGB value when all four parameters are given.
 * @param {number} green - The green RGB value when all four parameters are given.
 * @param {number} blue - The blue RGB value when all four parameters are given.
 * @param {number} alpha - The alpha/opacency value when all four parameters are given.
 * 
 * @author Adrian Gjerstad
 * @version 1
 */
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

/**
 * Set the stroke color of the canvas drawing to what you wish.
 * If there are not four parameters inputted, this is what this method does:
 * <ol>
 *   <li>Sets to a color with a grayscale value.</li>
 *   <li>Sets to a color with a grayscale value with alpha.</li>
 *   <li>Sets to an RGB color with full alpha</li>
 * </ol>
 * 
 * @param {number} red - The red RGB value when all four parameters are given.
 * @param {number} green - The green RGB value when all four parameters are given.
 * @param {number} blue - The blue RGB value when all four parameters are given.
 * @param {number} alpha - The alpha/opacency value when all four parameters are given.
 * 
 * @author Adrian Gjerstad
 * @version 1
 */
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

/**
 * Sets the width of a line to the width value given.
 * 
 * @param {number} newWeight - The weight assignment given to the canvas renderer.
 */
function strokeWeight(newWeight) {
  newWeight = Math.floor(Math.abs(newWeight));
  lineWidth = newWeight;
}

/**
 * Sets the angle mode to degrees or radians. The default is radians.
 * 
 * @param {number} identifier - The value to set the angleMode to. (Is always either 360 or 2PI)
 * 
 * @version 1
 */
function angleMode(identifier) {
  if(identifier === DEGREES) {
    rotateMode = DEGREES;
  } else if(identifier === RADIANS) {
    rotateMode = RADIANS;
  } else {
    console.warn("Rotation style was not recognized and was not changed.");
  }
}

/**
 * Converts degrees in measurement to the radian equivalent. Based on map() function.
 * 
 * @param {number} deg - The degrees count to be turned into radians.
 * 
 * @returns {number} The given degree count expressed in radians.
 */
function degreesToRadians(deg) {
  deg = deg % 360; // Must limit degrees from 0 to 360.

  return map(deg, 0, 360, 0, TWO_PI);
}

/**
 * Converts degrees in measurement to the radian equivalent. Based on map() function.
 * 
 * @param {number} deg - The degrees count to be turned into radians.
 * 
 * @returns {number} The given degree count expressed in radians.
 */
function radiansToDegrees(rad) {
  rad = rad % TWO_PI; // Must limit radians from 0 to 2π.

  return map(rad, 0, TWO_PI, 0, 360);
}

/**
 * Generates a random number based on the Math.random function. If no parameters are given, it will return
 * a random number between 0 inclusive and 1 exclusive. If given one number, it will return a random
 * number between 0 and the given number. If given two numbers, it will return a random number between the
 * first value and the last value.
 * 
 * @param {number} minimum - The minimum possible value if both parameters are entered.
 * @param {number} maximum - The maximum possible value if both parameters are entered.
 * 
 * @returns {number} The random number between the minimum and the maximum. Uses recursion.
 */
function random(minimum, maximum) {
  if(minimum === undefined && maximum === undefined) {
    return random(0, 0.9999999999);
  } else if(minimum !== undefined && maximum === undefined) {
    return random(0, minimum);
  } else if(minimum !== undefined && maximum !== undefined) {
    return Math.random(maximum - minimum) + minimum;
  } else {
    console.error("Parameter entries were insufficient.");
  }
}

/**
 * Rotates the canvas context according to the angle mode and the amount given. This does not effect the
 * the setPixel() and background() commands.
 * 
 * @param {number} amount - The amount to be rotated. This value depends on the rotation mode.
 * 
 * @see angleMode(identifier)
 * 
 * @author Adrian Gjerstad
 * @since 1.0.0
 */
function rotate(amount) {
  if(rotateMode === RADIANS) {
    rotation += amount;
  } else if(rotateMode === DEGREES) {
    rotation += (-amount !== Math.abs(amount)) ? degreesToRadians(amount) : ((TWO_PI - Math.abs(degreesToRadians(Math.abs(amount)))) % TWO_PI);
  } else {
    console.warn("Could not read the angle mode. No rotation adjustments made.");
  }
}

/**
 * Sets the font size to the given size. This value is used in pt. (points)
 * 
 * @param {number} size - The size, in points, of the new text.
 * 
 * @since 1.0.0
 * @version 1
 */
function fontSize(size) {
  
  if(size > 5) {
    textSize = size;
  } else {
    console.log("Cannot go below 6pt.");
  }

}

/**
 * Translates the focus of the canvas. This does not effect the setPixel() and background() methods.
 * 
 * @param {number} x - The translation increment on the x axis.
 * @param {number} y - The translation increment on the y axis.
 * 
 * @since 1.0.0
 * @version 1
 */
function translate(x, y) {
  translationX += x;
  translationY += y;
}

/**
 * The text alignment (left, right, or center) to set when drawing text. Based on a focus point. The focus
 * point being the x and y locations.
 * 
 * @param {String} pos - The position value.
 * 
 * @since 1.0.0
 * @version 1
 */
function textAlign(pos) {
  canvasContext.textAlign = pos;
}

// DRAW COMMANDS
/**
 * Draws the background to be whatever color you wish for it to be. The coloring vs. parameter rules apply
 * just like in {@link fill(red, green, blue, alpha)}. This color assignment will not effect the fill color,
 * nor will it be effected by the rotation or translation.
 * 
 * @param {number} red - The red RGB value of the background.
 * @param {number} green - The green RGB value of the background.
 * @param {number} blue - The blue RGB value of the background.
 * @param {number} alpha - The "fadeout effect" on the background for parts that are not drawn again.
 * 
 * @author Adrian Gjerstad
 * @version 1
 */
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

/**
 * Sets the color at the pixel location. The pixel location is not effected by translation and the given color
 * values do not effect the stroke color.
 * 
 * @param {number} x - The x location of the pixel disregarding translation.
 * @param {number} y - The y location of the pixel disregarding translation.
 * @param {number} red - The red RGB value to set the pixel to.
 * @param {number} green - The green RGB value to set the pixel to.
 * @param {number} blue - The blue RGB value to set the pixel to.
 * 
 * @see point(x, y)
 * 
 * @since 1.0.0
 * @version 2
 */
function setPixel(x, y, red, green, blue) {
  red = clamp(red, 0, 255);
  green = clamp(green, 0, 255);
  blue = clamp(blue, 0, 255);
  
  canvasContext.lineWidth = 1;

  canvasContext.fillStyle = "rgba(" + red + ", " + green + ", " + blue + ", 1)";
  canvasContext.fillRect(x, y, 1, 1);
}

/**
 * Draws a dot at the given (x, y) location using the stroke color. This method, unlike setPixel(), is effected by
 * the stroke weight and translation.
 * 
 * @param {number} x - The x location of the center of the "dot".
 * @param {number} y - The y location of the center of the "dot".
 * 
 * @see setPixel(x, y, red, green, blue)
 * 
 * @since 1.0.0
 * @version 1
 */
function point(x, y) {
  canvasContext.strokeStyle = paintStroke;
  canvasContext.fillStyle = paintStroke;
  canvasContext.lineWidth = 1;
  canvasContext.beginPath();
  canvasContext.arc(x + translationX, y + translationY, lineWidth, 0, TWO_PI);
  canvasContext.fill();
}

/**
 * Draws a line from (x1, y1) to (x2, y2) and is effected by rotation and translation. It is also drawn with the
 * stroke weight in mind.
 * 
 * @param {number} x1 - The 1st point's x location on the grid.
 * @param {number} y1 - The 1st point's y location on the grid.
 * @param {number} x2 - The 2nd point's x location on the grid.
 * @param {number} y2 - The 2nd point's y location on the grid.
 * 
 * @since 1.0.0
 * @version 1
 */
function line(x1, y1, x2, y2) {
  canvasContext.rotate(rotation);
  
  canvasContext.strokeStyle = paintStroke;
  canvasContext.fillStyle = paintStroke;
  canvasContext.lineWidth = lineWidth;
  canvasContext.beginPath();
  canvasContext.moveTo(x1 + translationX, y1 + translationY);
  canvasContext.lineTo(x2 + translationX, y2 + translationY);
  canvasContext.stroke();
  
  canvasContext.rotate(-rotation); // Reset rotation
}

/**
 * Draws a rectangle with borders dependent on stroke weight and stroke color, and it's center based off of the fill
 * color. Don't pass in the rectangle's bottom right corner coordinates for the 3rd and 4th, as those are the rectangle's
 * width and height.
 * 
 * @param {number} x - The x location of the top left corner of the rectangle.
 * @param {number} y - The y location of the top left corner of the rectangle.
 * @param {number} rectWidth - The rectangle's width.
 * @param {number} rectHeight - The rectangle's height.
 * 
 * @since 1.0.0
 * @version 1
 */
function rect(x, y, rectWidth, rectHeight) {
  canvasContext.rotate(rotation);
  
  canvasContext.strokeStyle = paintStroke;
  canvasContext.fillStyle = paintFill;
  canvasContext.lineWidth = lineWidth;
  canvasContext.fillRect(x + translationX, y + translationY, rectWidth, rectHeight);
  canvasContext.strokeRect(x + translationX, y + translationY, rectWidth, rectHeight);
  
  canvasContext.rotate(-rotation);
}

/**
 * Draw an ellipse/oval at the center coordinates, almost like point, but with ovals!
 * 
 * @param {number} centerX - The center x location of the ellipse.
 * @param {number} centerY - The center y location of the ellipse.
 * @param {number} radiusX - The radius of the ellipse on the x axis.
 * @param {number} [radiusY] - The radius of the ellipse on the y axis.
 * 
 * @see arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise)
 * 
 * @since 1.0.0
 * @version 1
 */
function ellipse(centerX, centerY, radiusX, radiusY) {
  canvasContext.rotate(rotation);
  
  if(centerX !== undefined && centerY !== undefined && radiusX !== undefined && radiusY === undefined) {
    radiusY = radiusX; // enables drawing circles with one radius entry.
  }

  canvasContext.strokeStyle = paintStroke;
  canvasContext.fillStyle = paintFill;
  canvasContext.lineWidth = lineWidth;
  
  canvasContext.beginPath();
  canvasContext.ellipse(centerX + translationX, centerY + translationY, radiusX, radiusY, 0, 0, TWO_PI);
  canvasContext.fill();

  canvasContext.beginPath();
  canvasContext.ellipse(centerX + translationX, centerY + translationY, radiusX, radiusY, 0, 0, TWO_PI);
  canvasContext.stroke();

  canvasContext.rotate(-rotation);
}

/**
 * Draw an arc at the center coordinates with a set radius, from a start to end angle, with an optional boolean defining
 * wether or not to draw it anticlockwise. This method is effected by rotation.
 * 
 * @param {number} centerX - The center location on the x axis.
 * @param {number} centerY - The center location on the y axis.
 * @param {number} radius - The radius of the arc to be drawn.
 * @param {number} startAngle - The angle to start at when drawing the arc in your angle mode of choice.
 * @param {number} endAngle - The angle to start at when drawing the arc in your angle mode of choice.
 * @param {boolean} [anticlockwise] - Draw the arc with a counter-clockwise spin.
 * 
 * @see angleMode(identifier)
 * @see ellipse(centerX, centerY, radiusX, radiusY)
 * 
 * @author Adrian Gjerstad
 * 
 * @since 1.0.0
 * @version 1
 */
function arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise) {
  canvasContext.rotate(rotation);
  
  canvasContext.strokeStyle = paintStroke;
  canvasContext.fillStyle = paintFill;
  canvasContext.lineWidth = lineWidth;
  
  canvasContext.beginPath();
  canvasContext.arc(centerX + translationX, centerY + translationY, radius, startAngle, endAngle, anticlockwise);
  canvasContext.lineTo(centerX + translationX, centerY + translationY)
  canvasContext.closePath();
  canvasContext.fill();

  canvasContext.beginPath();
  canvasContext.arc(centerX + translationX, centerY + translationY, radius, startAngle, endAngle, anticlockwise);
  canvasContext.stroke();
  
  canvasContext.rotate(-rotation);
}

/**
 * Draws text with the appropriate text alignment border size, color, and text size. When drawing text, act as if the x and y coordinate
 * is a point, not text. That point is the reference, based on where the text alignment is set to.
 * 
 * @param {String} string - The text to draw to the canvas at the given values entered above.
 * @param {number} x - The x location of the reference point on the canvas.
 * @param {number} y - The y location of the reference point on the canvas.
 * 
 * @see textAlign(pos)
 * @see strokeWeight(newWeight)
 * @see fontSize(size)
 * 
 * @author Adrian Gjerstad
 * 
 * @since 1.0.0
 * @version 2
 */
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
/**
 * Wait the given amount of time, with a callback afterwards.
 * 
 * @param {number} millis - The time to wait in miliseconds.
 * @param {callback} callback - The function to be called after the wait time has expired.
 * 
 * @since 1.0.0
 */
function wait(millis, callback) {
  if(millis > 0) {
    try {
      setTimeout(millis, callback);
    } catch(e) {
      console.error("Second parameter was not a function.");
    }
  } else {
    console.error("Wait time cannot be zeroed or negative. Got: " + millis);
  }
}

/**
 * Set the frame count for every second; How fast the loop runs.
 * 
 * @param {number} newFps - The frame count to be executed every second.
 * 
 * @since 1.0.0
 */
function frames(newFps) {
  if(newFps > 0) {
    fps = newFps;
    clearInterval(clock);
    clock = setInterval(1000/fps, paint);
    clearInterval(dojoJsRuntimeSystem.systemClock);
    dojoJsRuntimeSystem.systemClock = setInterval(1000/fps, dojoJsRuntimeSystem.dojojsSystemClock);
  } else if(newFps >= 60) {
    console.warn("Your browser may slow down due to high loop rates.");
  } else {
    console.error("Cannot enter a zeroed or negative value. Got: " + newFps);
  }
}

/**
 * Take an input value, it's minimum and maximum, and then the result's range. This can be used, for example,
 * in a game with a health bar, you could have a value between 0 and 100, but have a graphical interface with
 * a width of 150 pixels.
 * 
 * @param {number} value - The initial value.
 * @param {number} valueMinimum - The minimum value of the first parameter.
 * @param {number} valueMaximum - The maximum value of the first parameter.
 * @param {number} returnMinimum - The mapped minimum value; only returned if the initial parameter is equal to it's minimum.
 * @param {number} returnMaximum - The mapped maximum value; only returned if the initial parameter is equal to it's maximum.
 * 
 * @author Lance Gjerstad
 * @author Adrian Gjerstad
 * 
 * @since 1.0.0
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

/**
 * "Clamp" the given value between a minimum and maximum value.
 * 
 * @param {number} value - The given value to be "clamped".
 * @param {number} minimum - The minimum possible value.
 * @param {number} maximum - The maximum possible value.
 * 
 * @see map(value, valueMinimum, valueMaximum, returnMinimum, returnMaximum)
 * 
 * @since 1.0.0
 */
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

function DojoJSSystem() {
  this.systemClock = undefined;
}

DojoJSSystem.prototype.dojojsSystemClock = function() {
  
};

DojoJSSystem.prototype.initializeEventHandlers = function() {
  
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
      canvas.addEventListener("onkeydown", keyPressed);
      canvas.addEventListener("onkeypress", keyDown);
      canvas.addEventListener("onkeyup", keyReleased);
      
    } catch(e) {
      
    }
  }

};

/**
 * Get the mouse position on the webpage.
 * 
 * @param {Object} e - The MouseEvent object given by the html element.
 * 
 * @author Adrian Gjerstad
 * @since 1.0.0
 * @version 3
 */
function getMousePosition(e) {
  let dot, eventDoc, doc, body, pageX, pageY;

  e = e || window.event; // Support IE

  // IE Browser support:
  if(e.pageX == null && e.clientX != null) {
    eventDoc = (e.target && e.target.ownerDocument) || document;
    doc = eventDoc.documentElement;
    body = eventDoc.body;

    e.pageX = e.clientX +
      (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
      (doc && doc.clientLeft || body && body.clientLeft || 0);
    e.pageY = e.clientY +
      (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
      (doc && doc.clientTop  || body && body.clientTop  || 0 );
  }

  mouseX = e.pageX;
  mouseY = e.pageY;
}

window.onload = function() {
  try {
    
    setup();
    
    clock = setInterval(1000/fps, paint);
    
    dojoJsRuntimeSystem.initializeEventHandlers();
    dojoJsRuntimeSystem.systemClock = setInterval(1000/fps, dojoJsRuntimeSystem.dojojsSystemClock);

  } catch(e) {
    //console.info("Not every command is used.");
  }

  let keyDetectorAttr = document.createAttribute("onkeydown");
  keyDetectorAttr.value = "updateKeyCode(event)";
  document.body.setAttributeNode(keyDetectorAttr);
}

