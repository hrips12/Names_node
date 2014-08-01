var express = require('express');
var router = express.Router();
var fs=require("fs");
/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
  
});
router.get('/search', function(req, res) {
  res.render('search', { title: 'Express' });
  
});
router.post("/search", function(req,res){
	var name=req.body.search.split("");
		var name=req.body.search;
	if(!name){
		res.send("Please enter the name");
		return;
	}
	var words=fs.readFileSync("letters.json");
	var js_word=JSON.parse(words);
	var result=search(name,js_word);
	// var obj={};
	// for(i=0;i<result.length;++i){
	// 	var a=result[i].split("");
 //    console.log(a[0]);
	// 	obj.(a[0])=result[i]

	// }
	// var json=JSON.stringify(obj)
	// res.send(json);
	res.send(result);
});
router.get('/add', function(req, res) {
  res.render('add', { title: 'Express' });
  
});
router.post('/add', function(req, res){
	var name=req.body.search;
	if(!name){
		res.send("Please enter the name");
		return;
	}
	var latters=name.split("");
	var first_latter=latters[0];
	var words=fs.readFileSync("letters.json");
	var js_word=JSON.parse(words);
	for(key in js_word){
		if(first_latter==key){
			var arr=js_word[key];
			for(var i=0; i<arr.length;++i)
				if(name==arr[i])
					return;
			var new_arr=[js_word[key]];
			new_arr.push(name);
			js_word[key]=new_arr.toString();	
		}
		
	}
js_word=JSON.stringify(js_word);
fs.writeFileSync("letters.json", js_word);
res.send("Name was added");
});

var search=function(array, obj ){
	var arr=[]
for(var i=0; i<array.length; ++i){
	for(key in obj){
	if(array[i]==key){
      var names=obj[key].split(",");
     var c=Math.floor(Math.random()*names.length);
     arr.push(names[c]);
 }
}
}
return arr;
};	




module.exports = router;
