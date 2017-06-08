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

$$('.confirm-title-ok-cancel').on('click', 
function () 
    {
        myApp.confirm('Call Administration?', 'Watch Dog', 
      function () 
            {
                myApp.alert('You will be transfered');
            },
      function () 
            {
                myApp.alert('You clicked Cancel button');
            }
    );
});