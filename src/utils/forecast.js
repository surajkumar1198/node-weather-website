const request = require('request')
const forecast =(latitude,longitude,callback) => {
	const url = 'https://api.darksky.net/forecast/daf72ce262616b64ab6f69be18179220/' + latitude +',' + longitude
	request({url,json :true},(error,{body}) =>{
		if(error){
			callback('unable to connect weather services!',undefined)
		}
		else if(body.error){
			callback('unable to find location.Try another search',undefined)
		}
		else {
			callback(undefined,body.daily.data[0].summary+" It is currently "+body.currently.temperature+" degrees out. The minimum temperature is " + body.daily.data[0].temperatureMin + " and the maximum temerature is " +body.daily.data[0].temperatureMax + " .There is a "+body.currently.precipProbability+" % chance of rain"
		)}
	})

}
module.exports=forecast