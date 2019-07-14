const request = require('request')
const geocode= (address,callback) =>{
	const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoic3VyYWprdW1hcjExOTgiLCJhIjoiY2p4YmtwN2h2MDQ2ZzNvcDkyMTlkbjJnbCJ9.DgCKr_c2AFToKXWstwyQIQ'
    request({ url, json: true},(error,{body}={}) =>{
    	if(error){
    		callback('unable to connect to location services!',undefined)
    	}
    	else if(body.features.length=== 0){
    		callback('unable to find location .Try another search',undefined)
    	}
    	else {
    	
 	        
 	        
 	        data={
 	        	latitude:body.features[0].center[0],
 	        	longitude:body.features[0].center[1],
 	        	location:body.features[0].place_name
 	        }
 	        callback(undefined,data)
    	}

    })
}
module.exports= geocode