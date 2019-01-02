
const RangeCollection = require('./range.js');
const rc = new RangeCollection();

// default landing point
exports.test_server = function(req, res)
{
    console.log("Inside test_server");
    console.log(req.body);
    res.send("Server is running successfuly");
}


exports.reset_range_class = function(req, res)
{
    console.log("Inside reser request");
    console.log(req.body);
    rc.range = [];
    var ret = {};
    ret["success"] = true;
    ret["action"] = "Reset";
    ret["input"] = "";
    ret["output"] = rc.print();
    ret["range"] = rc.range;
}
// landing point for autocomplete end-point
exports.add = function(req, res)
{
    console.log("Inside add");
    console.log(req.body);
    if(req.body.left == undefined || req.body.right == undefined )
    {
        var res_err = {};
        res_err["success"]=false;
        res_err["message"] = "Please provide left and right bound";
        res.send(res_err);
        return;
    }
    left = parseInt(req.body.left);
    right = parseInt(req.body.right);
    rc.add([left, right]);
        
    var ret = {};
    ret["success"] = true;
    ret["action"] = "Add";
    ret["input"] = "["+ left+", "+right+")";
    ret["output"] = rc.print();
    ret["range"] = rc.range;    
    res.send(ret);
}

// landing point for search end-point
exports.remove = function(req, res)
{
    // console.log("Inside search");
    // console.log(req.body);
    if(req.body.left == undefined || req.body.right == undefined )
    {
        var res_err = {};
        res_err["success"]=false;
        res_err["message"] = "Please provide left and right bound";
        res.send(res_err);
        return;
    }
    left = parseInt(req.body.left);
    right = parseInt(req.body.right);    
    rc.remove([left, right]);

    var ret = {};
    ret["success"] = true;
    ret["action"] = "Remove";
    ret["input"] = "["+ left+", "+right+")";
    ret["output"] = rc.print();
    ret["range"] = rc.range; 
    res.send(ret);
}

// landing point for the keyword end-point
exports.print = function(req, res)
{
  var ret = {};
  ret["success"] = true;
  ret["range_str"] = rc.print();
  ret["range"] = rc.range;
  res.send(ret);
}
