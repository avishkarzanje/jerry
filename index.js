var express = require('express'); // middleware framework for handling requests
var Multer = require('multer'); // for parsed body when input type is form-data
var body_parser = require('body-parser'); // for parsed body for json and json urlencoded
const path = require('path');

var range_controller = require("./controller/rangeuser");

var app = express();
multer = Multer();
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}));
app.use(multer.array());

const PORT= 5000;
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.all("/*", function(req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","*");
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    next();
})

var log_fun = function(){
    console.log("The server is listening on port "+PORT);
}

app.listen(PORT,log_fun);
app.get("/test_server",range_controller.test_server);
app.get("",range_controller.test_server);

var router = express.Router();
router.route("/add").post(range_controller.add);
router.route("/remove").post(range_controller.remove);
router.route("/print").post(range_controller.print);
router.route("/reset").post(range_controller.reset_range_class);
app.use("/api",router);


