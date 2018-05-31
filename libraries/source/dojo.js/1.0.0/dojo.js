/* dojo.js 5/30/2018 v1.0.0 */
/* Copyright © 2018 by CodeDojo and/or it's individual developers. All rights reserved.
 * DO NOT REMOVE THIS NOTICE.
 */

let _ = document; // Used for systematic purposes although can be used in dojo projects.
let $h = document.head;
let $b = document.body;

let canvas;
let canvasContext;
let fps = 30;
let paintFill = "rgba(0, 0, 0, 0)"

function createWindow(windowWidth, windowHeight) {
  canvas = _.createElement("canvas");
  
  let widthAttr = _.createAttributeNode("width");
  let heightAttr = _.createAttributeNode("height");
  
  widthAttr.value = windowWidth;
  heightAttr.value = windowHeight;
  
  canvas.setAttributeNode(widthAttr);
  canvas.setAttributeNode(heightAttr);
  
  $b.appendChild(canvas);
  
  canvasContext = canvas.getContext("2d");
}

function noFill() {
  paintFill = "rgba(
}

function setTitle(title) {
  if(_.title != title) {
    _.title = title;
  } else {
    console.warn("Could not change page title. The document title");
  }
}

window.onload = function() {
  try {
    
    setup();
    
    setInterval(1000/fps, paint);
    
  } catch(e) {
    //console.info("Not every command is used.");
  }
}
