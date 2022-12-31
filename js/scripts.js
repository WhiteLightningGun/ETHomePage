/*!
* Start Bootstrap - Modern Business v5.0.6 (https://startbootstrap.com/template-overviews/modern-business)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-modern-business/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project


var canvas = document.getElementById("CanvasBox");
var CTX = canvas.getContext("2d");

var CENTRE_X = canvas.width / 2; //Defaulting to biggest window size
var CENTRE_Y = canvas.height / 2;


function backgroundHaze(colour) {

    var CENTRE_X = window.innerWidth / 1.2;
    var CENTRE_Y = canvas.height  / 1.25;
    console.log(CENTRE_X)
    console.log(CENTRE_Y)
    var grd = CTX.createRadialGradient
    (
        CENTRE_X, //x-coord location
        CENTRE_Y, //y-coord location
        0.20*CENTRE_X, //radius as fraction of constant
        CENTRE_X,
        CENTRE_Y,
        1*CENTRE_X
    )

    grd.addColorStop(1, "#ACFBFF");
    grd.addColorStop(0, colour); //A very dark blue

    // Fill with gradient
    CTX.fillStyle = grd;
    CTX.fillRect(0, 0, canvas.width, canvas.height);
}
var I = 0;

function centralStar(i) {
    var r = CENTRE_X*0.10;
    CTX.beginPath();
    CTX.arc(CENTRE_X-i, CENTRE_Y, r, 0, 2 * Math.PI, false);
    CTX.fillStyle = "lightgrey";
    CTX.fill();
}

backgroundHaze("white");
centralStar(100);
