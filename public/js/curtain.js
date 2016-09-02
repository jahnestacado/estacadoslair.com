define(["curtainjs","jquery"], function (c, $) {
    var curtain = $("#home-page").curtainify({
        swapModeOnOrientationChange: true,
        animationDuration: 500,
        landscape:{
            widthRatioCurtainA : 0.2,
            widthRatioCurtainB : 0.8,
        },
        portrait : {
            heightRatioCurtainA : 0.25,
            heightRatioCurtainB : 0.75,
        }
    });

    return curtain;
});
