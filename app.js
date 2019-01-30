var express = require("express");
var app = express();
var request = require("request");
var port = process.env.PORT || 3000;
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("search");
});

app.get("/results", function(req, res) {
	var query = req.query.search;
	var url = "http://www.omdbapi.com/?apikey=790aa06e&s="+query;
	request(url, function(error, response, body) {
		if(!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("results", {data : data});
		}
		// else {
		// 	console.log(error);
		// }
	});
});

app.listen(port, function() {
	console.log("listening on port 3000");
});