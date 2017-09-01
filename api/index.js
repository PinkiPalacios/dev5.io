const app=require ("express")();
const bodyParser = require('body-parser');
const j = require('jsend');
const u= require('./utils');

app.use(bodyParser.urlencoded({ extended: false }))

app.post('/', function(req,res){
	u(req.body)
	.then(result=> res.send(j.success(result)))
	.catch(err=> res.send(j.fail(err)))
})

app.listen(3000);
