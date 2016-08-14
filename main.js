
var myWeather = {};

$( document ).ready(function() {
    console.log( "ready!" );
    $("#con").css({"opacity":"0"})
   
    
    myWeather.loading="true";
    $( "#vertical-align" ).prepend( '<img src="http://www.statistics.gov.my/censusatlas/images/loading_1.gif" class="loading_gif">' );
   
});

//FREEGEOIP 

 $.ajax({
        url: 'http://freegeoip.net/json/',
        type: 'POST',
        dataType: 'jsonp',
        success: function(location) {
            console.log(JSON.stringify(location));
            console.log(JSON.stringify(location.city));
            console.log(JSON.stringify(location.region_name));
            weatherCall(location.city,location.country_name);
  


        },
        error: function(){

        	console.log("error with freegeoIp function");
        }
    });



// need to pull co-ordinates

 //if (navigator.geolocation) {

//}


// this is the api

function weatherCall(city, country){

var url = "http://api.openweathermap.org/data/2.5/weather?q=hanoi&APPID=7b5db5116823d68e7b816e93568f614a";



	 $.ajax({
        url: url,
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
            
        	console.log(JSON.stringify(data, null , 1));
        	console.log("cccountry pasesed to WEAHTER CALL :" + country);

        	var weather = data["weather"][0]["main"];
    		var iconUrl = "http://openweathermap.org/img/w/" + data["weather"][0]["icon"] + ".png";
    		var temp =data["main"]["temp"];
    		var humid = data["main"]["humidity"];

            myWeather.temp=(data["main"]["temp"])-273.15;
            myWeather.tempUnit="celsius";
     
            console.log("the temp from myWeather - " + myWeather.temp);


    		console.log(weather + iconUrl + temp + humid);

        	weatherDisplay(city, country, weather,iconUrl,temp,humid);

        },
        error: function(){

        	console.log("error with openWeathMap ajax request");
        }
    });
}

function weatherDisplay(city, country, weather,icon,temp,humid){

		console.log("*** at weatherDisplay() ***");
		$('#location_city').html(city);
        $('#location_country').html(country);
		$('#temp').html(Math.round(myWeather.temp));
        $('#temp_unit') .html(   "°C" );
        $('#temp_unit').css({"color":"#3399FF"});
        $('#humid').html("Humidity: " + humid + "%");
		$('#weather').html(weather);
		  
        $('#icon').html('<img src="' + icon +'" class="weather_img" />');
		
	   console.log("at end of weather display");

        // now display the container
       
        myWeather.loading="false";
        $( ".loading_gif" ).remove();
         $( "#con" ).css("display","table");
        $( "#con" ).fadeTo(1000, 1);


}

function convertTemp(){

    if(myWeather.tempUnit==="celsius"){
         console.log("temp before call : " + myWeather.temp);
        var newTemp = ((myWeather.temp * 1.8) + 31);
          console.log("new temp after conversion :" + newTemp);
        $('#temp').html(Math.round(newTemp));
        myWeather.temp=newTemp;
        myWeather.tempUnit = "fahrenheit";
        $('#temp_unit') .html(   ' <div id=\'temp_unit\' > °F <\/div> ' );
        $('#temp_unit').css({"color":"#3399FF"});

    }else{ // tempunit === fahrenheit
        
        console.log("temp before call : " + myWeather.temp);
        var newTemp = ((myWeather.temp - 31) / 1.8);
        console.log("new temp after conversion :" + newTemp);
        $('#temp').html(Math.round(newTemp));
        myWeather.temp=newTemp;
        myWeather.tempUnit = "celsius";
        $('#temp_unit') .html(   ' <div id=\'temp_unit\' > °C <\/div> ' );
         $('#temp_unit').css({"color":"#3366CC"});
    }

}
