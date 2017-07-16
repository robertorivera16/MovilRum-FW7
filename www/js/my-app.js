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

//--Create Instance of LocalForage to store user information
var userData = localforage.createInstance({
    name: "User Data"
});


//--Verify if user has chosen to be signed in forever
//--BEGIN Signed In Automatically Option--//
userData.getItem('allpass').then(function(value){
    console.log(value)
    if(value){
        myApp.closeModal();
    }
});
//--END Signed In Automatically Option--//

//Hides the cancel button on start
$(".cancel-row").hide();

//Declare latitude and longitude variables
var lat;
var long;


//--Sign Out Click--//
$(".sign-out").on('click', function(){
    userData.clear();

});


//--BEGIN Forgot Password Click Execution--//
$$('.forgot-ps').on('click', function () {
    var buttons = [


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
//--END Forgot Password Click Execution--//



//--**BEGIN Sign in Execution**--//
$$('.sign-in').on('click', function(){
    //Get FORM data, username and password fields
    var formData = myApp.formToData('#login-form');
    var username = String(formData.username);
    var password = String(formData.password);
    //Custom JSON service
    var JSONService = 'http://beta.json-generator.com/api/json/get/Vkilrnmm7';
    //Control boolean variable to determine if the username and password is a match
    var found = false;

    //--Start of the preloader modal
    myApp.showPreloader("Signing in");

    //--Sends to server the login intention 
    $.post( "http://appsvr.uprm.edu/watchdog/connect.php", { rid: username, type: password, params: "" });

    //--BEGIN Verification Process--//
    /*
    IF (userData is empty), THEN
        Get JSON data and verify each student in JSON with username & password previously stored in the variables. If there is a match  it saves the username and unique ID in userData instance, and sets found to TRUE. 
    ELSE
        Get JSON data and verify each student in JSON with usename & password. If there is a match, it doesn't save the data in userData instance since it is already there. It sets found to TRUE. 


    */
    userData.length().then(function(length){
        if (length === 0) {
            $.getJSON(JSONService, function(data) {
                console.log("Contact Information Recieved");
            }).done(function(data) {
                $.each( data.students, function( i, item ) {
                    if(username == String(item.user) && password == String(item.pw)){
                        userData.setItem(String(username), String(item.u_id)).then(function (value) {
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

        /*Waits 2 seconds for the JSON server<>client communication THEN
            It closes the login screen IF(found is TRUE). 
        */


        setTimeout(function () {
            myApp.hidePreloader();
            if(found){
                myApp.closeModal('.login-screen');


                //--Keep me signed in QUESTION
                //
                myApp.confirm('Are you sure?', 'Keep me signed in...', function () {
                    //Saves key-'allpass' with value-'true'

                    userData.setItem('allpass', true).then(function(value){
                        console.log(value);
                    });

                }, function(){
                    //Saves key-'allpass' with value-'false'
                    userData.setItem('allpass', false).then(function(value){
                        console.log(value);
                    });

                });

            }else{
                myApp.alert("E-mail or password incorrect. Try Again!");

            }
        }, 2000);





    });
    //--ENDS Verification Process--//
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

        lat = position.coords.latitude;
        long = position.coords.longitude;

        userData.key(1).then(function(keyName) {
            // Name of the key.
            $.post( "http://appsvr.uprm.edu/watchdog/connect.php", { rid: keyName , type: "GPS", params: lat + "," + long });
        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });


        myApp.alert("Location sent: Latitude: " + lat + " Longitude: " + long);


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
        $(".cancel-row").show();
        $(".timer_text").css("top", "60%");

        console.log('timer started');
        $(".timer_text").html("5");



    }
});

// defining options using on
timer.on('end', function () {
    userData.key(1).then(function(keyName) {
        // Name of the key.
        $.post( "http://appsvr.uprm.edu/watchdog/connect.php", { rid: keyName , type: "ALERT", params: "ON" });
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });

    getPosition();
    $(".cancel-row").hide();
    console.log('timer ended');
    $(".timer_text").css("top", "50%");
    $(".timer_text").html("Send Emergency");



});

document.getElementById("timer").addEventListener("click", startTimer);

$(".round-emerg-btn-circle").mousedown(function(){

    $(this).css("background-color", "#cf2b18");
}).mouseup(function(){
    $(this).css("background-color", "red");
});

$(".cancel-btn").on("click", function(){
    $(".cancel-row").hide();
    timer.stop();
    $(".timer_text").css("top", "50%");
    $(".timer_text").html("Send Emergency");
});



function startTimer() {
    timer.start(5);
}