const express = require('express')
const app = express()
const fortune = require('./lib/fortune.js')
const handlebars = require('express3-handlebars')
						   .create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

/*have not idea what the followong does. Somthing with testing*/
app.use(function(req,res,next){
	res.locals.showTests = app.get('env') != 'production' && req.query.test === '1';
	next();
})

app.get('/', function(req,res) {
	res.render('home');
});
app.get('/about', function(req,res) {
	res.render('about',{fortune: fortune.getFortune() });
});

app.use(function(req,res) {
	res.status(404);
	res.render('404');
});

app.use(function(err,req,res,next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:' + app.get('port'));
});