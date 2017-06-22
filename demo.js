var express = require('express');
var app=express();
var fs=require('fs');
//设置handlebars视图引擎
var handlebars=require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

var fortunes = ["conquer your fears","rivers need springs","do not fear what you don't know","you will have a pleasant surprise"];

app.use(express.static(__dirname + '/public'));

app.set('port',process.env.PORT||3000);

app.get('/',function(req,res){
	// res.type('text/plain');
	// res.send('homePage');
	res.render('home');
});

app.get('/about',function(req,res){
	// res.type('text/plain');
	// res.send('About Page');
	var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
	res.render('about',{fortune:randomFortune});
});

app.use(function(req,res){
	// res.type('text/plain');
	res.status(404);
	// res.send('404-not found');
	res.render('404');
});

app.use(function(err,req,res,next){
	console.error(err.stack);
	// res.type('text/plain');
	res.status(500);
	// res.send('500- Server Error');
	res.render('500');
});

app.listen(app.get('port'),function(){
	console.log('express started on http://localhost:'+ app.get('port')+'; press ctrl + C to terminate.');
});