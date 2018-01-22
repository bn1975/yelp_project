// We need jQuery
//MAKE SURE THE PAGE IS LOADED BEFORE RUNNING
$(document).ready(function () {
  //CALL the READCOOKIE function to acquire client location
      //turn lat & long values stored in browser into an object our app can access
  //We may not have a value for position
      //1.  if the client denies permission to access it and no cookie is created
      //2.  or has not been to the site before and no cookie exists
  var position = readCookie('userPosition');

//LOCATION:  use native browser capabilities to lookup client location
  function getPosition(loader) {
    // Taken from MDN w3c schools
    // https://www.w3schools.com/html/html5_geolocation.asp
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
//IF: position is obtained
      if (position) {
//SAVE:  client location (i.e. values for long and lat)
        var positionParams = 'lat=' + position.coords.latitude + '&long=' + position.coords.longitude;
//CALL: function "createcookie"
  //CREATE: cookie called "userPosition"
    //INSERT: client location into cookie
        createCookie('userPosition', positionParams);
          //Turn off the loader
        loader.remove();
//IF: position not obtained throw error
      } else {
        alert('Broken');
      }
    })
  }

  //CHECK:  if var position has a value in order to proceed
    if (position) {
      alert('We have your position!');
  //IF we do not have users location
      //load the progress indicator
    } else {
      var loader = $('<div>').css({
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: 'url(https://s-media-cache-ak0.pinimg.com/originals/cb/05/42/cb05420fec7a12bb752da11df0fb553f.gif)',
        backgroundSize: 'cover',
        height: '400px',
        width: '400px',
        margin: '0 auto'
      });
  //place loader in the "results" div in the DOM w/ jquery
      $('.results').prepend(loader);
      getPosition(loader);
    }

// TAKEN FROM https://www.quirksmode.org/js/cookies.html
//CREATE: urlencoded location cookie
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

//PARSE:  cookie from urlencoded to string (?) that the app can access and read
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
                    //////////WHY ARE WE RETURNING NULL?///////////////
	return null;
}

                    /////////////WHEN/WHERE IS THIS CALLED??//////////
//DELETE:  Cookie (on terminating session?)
function eraseCookie(name) {
	createCookie(name,"",-1);
}
});
