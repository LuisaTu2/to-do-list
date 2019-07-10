const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const port =  process.env.PORT || 8080;
const app = express();

const p = path.join(__dirname, "./");
console.log(p);
app.use(express.static(path.join(__dirname, "./")));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    console.log("Hello there");   
    res.sendFile(path.join(__dirname, '/index.html'));
}
);

app.listen(port, () => {
    console.log("Server is up on port " + port + ".");
});
