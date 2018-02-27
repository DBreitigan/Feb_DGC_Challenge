//Type node index.js to run
//Use nodemon index.js to auto-reload when changes are made
// if nodemon isnt installed: npm install -g nodemon
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//use bodyParser() to let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/', function (req, res) {
    res.send("Result: " +  addAdjacentCubes(req.body.slice));
});

// Finds the location of the cubes
function findZeroLocation(slice) {
    var zeroSlice;
    var zeroRow;
    var zeroColumn;

    for(var i = 0; i < Object.keys(slice).length; i++){
        for(var j = 0; j < Object.keys(slice[0].row).length; j++){
            for(var k = 0 ; k < Object.keys(slice[0].row[0].column).length; k++){
                if(slice[i].row[j].column[k].value == 0){
                    zeroSlice = i;
                    zeroRow = j;
                    zeroColumn = k;

                }
            }
        }
    }

    return {zeroSlice: zeroSlice, zeroRow: zeroRow, zeroColumn: zeroColumn};
}

//Adds all the adjacent sides
function addAdjacentCubes(slice) {
    var cube = findZeroLocation(slice);
    var total = 0;

    //Add Right
    if(slice[cube.zeroSlice].row[cube.zeroRow].column[cube.zeroColumn + 1]!= undefined && slice[cube.zeroSlice].row[cube.zeroRow].column[cube.zeroColumn + 1].value != null){
        total += slice[cube.zeroSlice].row[cube.zeroRow].column[cube.zeroColumn + 1].value;
    }
    //Add Left
    if(slice[cube.zeroSlice].row[cube.zeroRow].column[cube.zeroColumn - 1] != undefined && slice[cube.zeroSlice].row[cube.zeroRow].column[cube.zeroColumn - 1].value != null){
        total += slice[cube.zeroSlice].row[cube.zeroRow].column[cube.zeroColumn - 1].value;
    }

    //Add Down
    if((slice[cube.zeroSlice].row[cube.zeroRow + 1] != undefined ) && slice[cube.zeroSlice].row[cube.zeroRow + 1].column[cube.zeroColumn].value != null){
        total += slice[cube.zeroSlice].row[cube.zeroRow + 1].column[cube.zeroColumn].value;
    }

    //Add Up
    if((slice[cube.zeroSlice].row[cube.zeroRow - 1] != undefined ) && slice[cube.zeroSlice].row[cube.zeroRow - 1].column[cube.zeroColumn ].value != null){
        total += slice[cube.zeroSlice].row[cube.zeroRow - 1].column[cube.zeroColumn].value;
    }

    //Add Back
    if(slice[cube.zeroSlice + 1] != undefined && slice[cube.zeroSlice + 1].row[cube.zeroRow].column[cube.zeroColumn].value != null){
        total += slice[cube.zeroSlice + 1].row[cube.zeroRow].column[cube.zeroColumn].value;
    }

    //Add Forward
    if(slice[cube.zeroSlice - 1] != undefined && slice[cube.zeroSlice - 1].row[cube.zeroRow].column[cube.zeroColumn].value != null){
        total += slice[cube.zeroSlice - 1].row[cube.zeroRow].column[cube.zeroColumn].value;
    }

    return total;
}



app.listen(3000, function () {
    console.log("Listening to port 3000!");
});
