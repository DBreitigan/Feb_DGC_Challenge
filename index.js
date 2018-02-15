//Type node index.js to run
//Use nodemon index.js to auto-reload when changes are made
// if nodemon isnt installed: npm install -g nodemon
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//use bodyParser() to let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/', function (req, res) {
    res.send("localhost:3000\nAnswer : " +  createCubes(req.body.slice));
    createCubes(req.body.slice)
});


function createCubes(slice) {
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

    console.log("test: "+ zeroSlice + zeroRow+  zeroColumn)

    var total = 0;

    if(slice[zeroSlice].row[zeroRow].column[zeroColumn + 1].value != null){
        total += slice[zeroSlice].row[zeroRow].column[zeroColumn + 1].value;
    }

    if(slice[zeroSlice].row[zeroRow].column[zeroColumn - 1].value != null){
        total += slice[zeroSlice].row[zeroRow].column[zeroColumn - 1].value;
    }

    if((slice[zeroSlice].row[zeroRow + 1] != undefined ) && slice[zeroSlice].row[zeroRow + 1].column[zeroColumn].value != null){
        total += slice[zeroSlice].row[zeroRow + 1].column[zeroColumn].value;
    }

    if((slice[zeroSlice].row[zeroRow - 1] != undefined ) && slice[zeroSlice].row[zeroRow - 1].column[zeroColumn ].value != null){
        total += slice[zeroSlice].row[zeroRow - 1].column[zeroColumn].value;
    }

    if(slice[zeroSlice + 1] != undefined && slice[zeroSlice + 1].row[zeroRow].column[zeroColumn].value != null){
        total += slice[zeroSlice + 1].row[zeroRow].column[zeroColumn].value;
    }

    if(slice[zeroSlice - 1] != undefined && slice[zeroSlice - 1].row[zeroRow].column[zeroColumn].value != null){
        total += slice[zeroSlice - 1].row[zeroRow].column[zeroColumn].value;
    }

    console.log("answer: "+ total);
    return total;

}



app.listen(3000, function () {
    console.log("Listening to port 3000!");
});
