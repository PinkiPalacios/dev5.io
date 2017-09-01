const app=require ("express")();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

app.post('/', function(req,res){
	console.log(req.body)
	res.send(req.body);
})

app.listen(3000);
