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
$$('.ac-5').on('click', function () {
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