require(["jquery"], function($) {
    // Appends font-classes on dummy DOM elements in order to load fonts 
    // before rendering of the view and avoid flickering
    var elQ = $(".container").append(" <span id='font-loader'></span>")
    for (var i = 1; i <= 9; i++) {
        $("<span></span>").text("foo").addClass("font-" + i).appendTo("#font-loader");
    }

    setTimeout(function() {
        elQ.find("#font-loader").remove();
    }, 500);
});