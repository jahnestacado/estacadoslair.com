define(["curtainjs","jquery"], function (c, $) {
    var curtain = $("#home-page").curtainify({
        landscape:{
            widthRatioCurtainA : 0.2,
            widthRatioCurtainB : 0.8,
        }
    });

    return curtain;
});
