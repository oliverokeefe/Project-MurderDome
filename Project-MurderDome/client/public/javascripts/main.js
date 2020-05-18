
require(['domReady', 'script'], function (domReady, script) {
    domReady(function () {
        //This function is called once the DOM is ready.
        //It will be safe to query the DOM and manipulate
        //DOM nodes in this function.
        console.info('The DOM is ready before I happen');
        console.log(script);
    });
});

//define(['domReady!'], function () {
//    console.info('The DOM is ready before I happen');
//    script.init();
//});

//require(['domReady!'], function (doc) {
//    //This function is called once the DOM is ready,
//    //notice the value for 'domReady!' is the current
//    //document.

//    init()
//});



