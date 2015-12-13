define(["curtainjs","jquery"], function (c, $) {
    var curtain = $("#home-page").curtainify({
        swapModeOnOrientationChange: true,
        animationDuration: 500,
        landscape:{
            widthRatioCurtainA : 0.17,
            widthRatioCurtainB : 0.83,
        },
        portrait : {
            heightRatioCurtainA : 0.2,
            heightRatioCurtainB : 0.8,
        }
    });

    return curtain;
});
