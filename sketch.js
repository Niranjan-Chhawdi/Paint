var currentPath = [];
var drawing = [];
var isDrawing = false;
var database;

function setup() {
    canvas = createCanvas(1200, 500);
    canvas.mousePressed(startPath);
    canvas.parent('canvasContainer');
    canvas.mouseReleased(endPath);

 var clearButton = select('#clearButton');
    clearButton.mousePressed(clearDrawing);

    var saveButton = select('#saveButton');
  saveButton.mousePressed(saveDrawing);

    database = firebase.database();

    var ref = database.ref('drawings');
    ref.on('value', gotData, errorData);
}

function startPath() {
    isDrawing = true;
    currentPath = [];
    drawing.push(currentPath);
}

function endPath() {
    isDrawing = false;
}

function draw() {
    background("black");
    //console.log("drawing");

    if (isDrawing) {
        var point = {
            x: mouseX,
            y: mouseY,
        }
        currentPath.push(point);
    }

    stroke("white");
    strokeWeight(5);
    noFill();

    for (var i = 0; i < drawing.length; i++) {
        var path = drawing[i];
        beginShape();
        for (var j = 0; j < path.length; j++) {
            vertex(path[j].x, path[j].y);
        }
        endShape();
    }
}

function gotData(data) {
    // clear the listing
    var elts = selectAll('.listing');
    for (var i = 0; i < elts.length; i++) {
      elts[i].remove();
    }
  
    var drawings = data.val();
    var keys = Object.keys(drawings);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      //console.log(key);
      var li = createElement('li', '');
      li.class('listing');
      var ahref = createA('#', key);
      ahref.mousePressed(showDrawing);
      ahref.parent(li);
  
      var perma = createA('?id=' + key, 'permalink');
      perma.parent(li);
      perma.style('padding', '4px');
  
      li.parent('drawinglist');
    }
  }
  

function errorData(error) {
    console.log(error);
}

function showDrawing() {
    var key = this.html();
    var ref = database.ref('database/' + key);
    ref.on('value',oneDrawing, errorData)
    console.log(this.html());
}

function oneDrawing(){
    var drawing =data.val();
    console.log(drawing);
}

function clearDrawing() {
    drawing = [];
}

function saveDrawing(){
var ref =database.ref('drawing');
var data ={
    name:"Niranjan",
    drawing:drawing
}
 var result =ref.push(data, dataSent);
 console.log(result.key)

function dataSent(status){
  console.log(status) 
}
}