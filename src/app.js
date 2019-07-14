const path =require('path')
const express = require('express')
const hbs = require('hbs')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')


const app = express()
const port = process.env.PORT || 3000

//Define path for express config

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath =path.join(__dirname,'../templates/views')
const partialsPath =path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => { 
	res.render('index',{
		title:'Weather',
		name :'suraj'
	}) 

})
app.get('/about',(req,res) => {
	res.render('about',{
		title:'About',
		name :'suraj'
	})
})
app.get('/help',(req,res) => {
	res.render('help',{
		helpText:'This is some helpful text.',
		title:'Help',
		name:'suraj'

	})
})



app.get('/weather',(req,res) =>{
	if(!req.query.address){
		return res.send({
			error: 'you must provide an address'
		})
	}


	geocode(req.query.address,(error,{longitude,latitude,location}={}) =>{
		if(error){ 
		return res.send(
			{error})
	}
	
	forecast(latitude,longitude,(error,forecastData) => {
		if (error){
			return res.send({error})
		}
	res.send({
		forecast:forecastData,
		location,
		address:req.query.address
	})

	})
	// res.send({
	// 	forecast:'it is rainy',
	// 	location:'patna',
	// 	address:req.query.address
	// }

	// )

})
})

app.get('/products' ,(req,res) =>{
	if(!req.query.search){
		return res.send({
			error : 'You must provide a search term'
		})
	}
	console.log(req.query)
	res.send({
		products : []

	})
})
app.get('/help/*', (req,res) =>{
	res.render('404',{
		title:'404',
		name:'suraj',
		errorMessage:'Help aricle not found'
	})

})
app.get('*',(req, res) =>{
	res.render('404',{
		title:'404',
		name:'suraj',
		errorMessage:'page not found'
	})
	

})


app.listen(port ,() =>{
    
    console.log('server is up on port '+ port)

})