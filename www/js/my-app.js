// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon:true, modalTitle:"Watch Dog"
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


//$("#directory-btn").click(function(){
//    var JSONService = 'http://beta.json-generator.com/api/json/get/EJz5aVtQM';
//
//    contactData.length().then(function(length){
//      if (length === 0) {
//        $.getJSON(JSONService, function(data) {
//          alert("Contact Information Recieved");
//        })
//
//        .done(function( data ) {
//          $.each( data.contacts, function( i, item ) {
//            contactData.setItem(item.name, item.phone);
//          });
//        });
//      }else{
//        alert("Data Fetched");
//      }
//    });
//
//  });

var timer = new Timer({
    tick : 1,
    ontick : function (sec) {
        console.log('interval', Math.ceil(sec/1000));
        $(".timer_text").html(Math.ceil(sec/1000));
        
    },
    onstart : function() {
        console.log('timer started');
        $(".timer_text").html("10");
    

    }
});

// defining options using on
timer.on('end', function () {
    console.log('timer ended');
    $(".timer_text").html("END");

});

document.getElementById("timer").addEventListener("click", startTimer);

function startTimer() {
    timer.start(10);
}