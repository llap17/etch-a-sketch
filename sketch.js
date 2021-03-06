//ROOT
var gridContainer = document.getElementById("grid-container");
let size = 16;
let colorSwitch = 1;
let greyColor = "#686868";
let sketchColor = "#F5F5F5";

//SHADING FUNCTION
function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

//COLOR CODE CONVERSION FUNCTION
function hexColor(item) {
    let currentColor = item.style.backgroundColor
        .split("(")[1].split(")")[0];
    currentColor = currentColor.split(",");
    currentColor = currentColor.map(function (x) {
        x = parseInt(x).toString(16);
        return (x.length == 1) ? "0" + x : x;
    });
    currentColor = "#" + currentColor.join("");
    return currentColor;
}

//COLORING BOXES FUNCTION
function coloring() {
    const gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach(item => item.style.backgroundColor = sketchColor);
    gridItems.forEach(item => item.addEventListener("mouseover", function(e) { 
        runColoring(e, item);
    }));
    gridItems.forEach(item => item.addEventListener("mousedown", function(e) {
        runColoring(e, item);
    }));

    function runColoring(e, item) {
        if (e.which == 1 && colorSwitch == 1) {
            item.style.backgroundColor = greyColor;
        } else if (e.which == 1 && colorSwitch == 2) {
            item.style.backgroundColor
                = '#' + Math.floor(Math.random() * 16777215).toString(16);
        } else if (e.which == 1 && colorSwitch == 3) {
            let currentColor = hexColor(item);
            item.style.backgroundColor = shadeColor(currentColor, -10);
        } else if (e.which == 1 && colorSwitch == 4) {
            let currentColor = hexColor(item);
            item.style.backgroundColor = shadeColor(currentColor, 10);
        }
    }
}

//GENERATE SKETCH
function generate() {
    let a = size*=size;
    for (let i = 0; i < a; i++) {
        var sketch = document.createElement("div");
        sketch.setAttribute("id", "grid-item");
        sketch.setAttribute("class", "grid-item");
        gridContainer.appendChild(sketch);
    }
    coloring();
}

//DELETE SKETCH FUNCTION
function clear() {
    document.querySelectorAll(".grid-item").forEach(el => el.remove());
}

//MAKE NEW SKETCH FUNCTION
function newSketch () {
    clear();
    generate();
}

//TRIGGER SKETCH CREATION WHEN PAGE LOADED
generate();

//NEW BUTTON
let btnNew = document.getElementById("btn-new");
btnNew.addEventListener('click', function(){
    size = prompt("How many rows should the new sketch have? (max limit 64)", "16");
    if (size === null) {
        return;
    }
        while(size > 64 || size < 2){
            alert("The maximum is 64 and the minimum is 2!");
            size = prompt("How many rows should the new sketch have? (max limit 64)");
        }
    document.documentElement.style.setProperty('--grid-cols', size);
    document.documentElement.style.setProperty('--grid-rows', size);
    document.getElementById("size-para").innerHTML = "SIZE: " + size + "x" + size;
    newSketch();
});

//COLOR MODE BUTTON
let btnColor = document.getElementById("btn-color");
let modePara = document.getElementById("mode-para");
btnColor.addEventListener('click', function(){
    if (colorSwitch == 1) {
        colorSwitch = 2;
        document.getElementById("mode-para").innerHTML = "MODE: Random";
    } else if (colorSwitch == 2) {
        colorSwitch = 3;
        document.getElementById("mode-para").innerHTML = "MODE: Darken";
    } else if (colorSwitch == 3) {
        colorSwitch = 4;
        document.getElementById("mode-para").innerHTML = "MODE: Lighten";
    } else if (colorSwitch == 4) {
        colorSwitch = 1
        document.getElementById("mode-para").innerHTML = "MODE: Grey";
    }
});