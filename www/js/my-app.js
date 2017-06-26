// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon:true, modalTitle:"Watch Dog", swipePanel: 'left'
});

// Export selectors engine
var $$ = Dom7;

// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: true,
    // Enable Dom Cache so we can use all inline pages
    domCache: true
});

var userData = localforage.createInstance({
    name: "User Data"
});

userData.getItem('allpass').then(function(value){
    console.log(value)
    if(value){
        myApp.closeModal();
    }
});





//- With callbacks on click
$$('.forgot-ps').on('click', function () {
    var buttons = [

        //Call Button
        {
            text:'Visite nuestro help desk en Monzon 107 o llame nuestra línea de ayuda al 787-832-4040 ext 3331.',
            label:true
        },
        {
            text: 'Call Administration',
            onClick: function () {
                myApp.alert('Your call is being transferred');
                window.open('tel:7878324040;3331', '_system');

            }
        },

        //Cancel Button
        {
            text: 'Cancel',
            color: 'red',
        }
    ];
    myApp.actions(buttons);
}); 

//*****SAVE USER INFO*****//

$$('.sign-in').on('click', function(){
    var formData = myApp.formToData('#login-form');
    var username = String(formData.username);
    var password = String(formData.password);
    var JSONService = 'http://beta.json-generator.com/api/json/get/Vkilrnmm7';
    var found = false;

    myApp.showPreloader("Signing in");

    //$.post( "http://appsvr.uprm.edu/watchdog/connect.php", { rid: username, type: password, params: "" } );


    userData.length().then(function(length){
        if (length === 0) {
            $.getJSON(JSONService, function(data) {
                console.log("Contact Information Recieved");
            }).done(function(data) {
                $.each( data.students, function( i, item ) {
                    if(username == String(item.user) && password == String(item.pw)){
                        userData.setItem(username, String(item.u_id)).then(function (value) {
                            found = true;
                            console.log("Succes--" + found);
                            console.log(username + " saved with unique id: " + String(item.u_id));

                        }).catch(function(err) {
                            // This code runs if there were any errors
                            console.log("Error-- save userinfo");
                        });
                    }
                });

            });
        }else{
            $.getJSON(JSONService, function(data) {
                console.log("Contact Information Recieved");
            }).done(function(data) {

                $.each( data.students, function( i, item ) {
                    if(username == String(item.user) && password == String(item.pw)){
                        found = true;
                    }
                });

            });
        }

        setTimeout(function () {
            myApp.hidePreloader();
            if(found){
                myApp.closeModal('.login-screen');


                //Keep me signed in QUESTION***
                //
                myApp.confirm('Are you sure?', 'Keep me signed in...', function () {
                    userData.setItem('allpass', true).then(function(value){
                        console.log(value);
                    });
                    
                }, function(){
                    userData.setItem('allpass', false).then(function(value){
                        console.log(value);
                    });
                    
                });

            }else{
                myApp.alert("E-mail or password incorrect. Try Again!");

            }
        }, 2000);





    });
}); 

//Get device location coordinates**
//
function getPosition() {

    var options = {
        enableHighAccuracy: true,
        maximumAge: 3600000
    }

    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    function onSuccess(position) {

        //Use the data previously saved to show a web alert
        myApp.alert('Latitude: ' + position.coords.latitude + " Longitude: " + position.coords.longitude, "Your Location:");





    };
    function onError(error) {
        alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    }
}

//Timer**
//
var timer = new Timer({
    tick : 1,
    ontick : function (sec) {
        console.log('interval', Math.ceil(sec/1000));
        $(".timer_text").html(Math.ceil(sec/1000));

    },
    onstart : function() {
        console.log('timer started');
        $(".timer_text").html("3");



    }
});

// defining options using on
timer.on('end', function () {

    console.log('timer ended');
    $(".timer_text").html("SENT");
    getPosition();

});

document.getElementById("timer").addEventListener("click", startTimer);

function startTimer() {
    timer.start(3);
}