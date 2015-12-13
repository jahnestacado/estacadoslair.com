define(["curtainjs","jquery"], function (c, $) {
    var curtain = $("#home-page").curtainify({
            animationDuration: 500,
        landscape:{
            widthRatioCurtainA : 0.15,
            widthRatioCurtainB : 0.85,
        }
    });

    return curtain;
});
