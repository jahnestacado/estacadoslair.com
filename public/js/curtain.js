define(["jquery"], function ($) {

    var BORDER_SIZE = 1;

    var curtainJs = function curtainJs() {
        renderLeftCurtain();
        renderRightCurtain();
        $("#open-btn").click(function () {
            open();
        });
        $("#back-btn").click(function () {
            close();
        });

        return controls;
    };

    $(window).on("resize", function () {
        controls.close();
        renderLeftCurtain();
        renderRightCurtain();
    });

    var controls = {
        close: function close() {
            var leftCurtainElQ = $("#curtain-left");
            var rightCurtainElQ = $("#curtain-right");
            var curtainWidths = getCurtainWidths();


            leftCurtainElQ
                    .removeClass("curtain-left-opened")
                    .addClass("curtain-left-closed")
                    .css("left", "-" + curtainWidths.left + "px");

            rightCurtainElQ
                    .removeClass("curtain-right-opened")
                    .addClass("curtain-right-closed")
                    .css("right", "-" + curtainWidths.right + "px");
        },
        open: function open() {
            var leftCurtainElQ = $("#curtain-left");
            var rightCurtainElQ = $("#curtain-right");
            var curtainWidths = getCurtainWidths();

            leftCurtainElQ
                    .removeClass("curtain-left-closed")
                    .css("display", "")
                    .addClass("curtain-left-opened")
                    .width(curtainWidths.left)
                    .css("left", "0");

            rightCurtainElQ
                    .removeClass("curtain-right-closed")
                    .css("display", "")
                    .addClass("curtain-right-opened")
                    .width(curtainWidths.right)
                    .css("right", "0");
        }
    };

    var renderLeftCurtain = function renderLeftCurtain() {
        $("<div/>").appendTo("#home-page")
                .attr("id", "curtain-left")
                .addClass("curtain-left-closed")
                .css({
                    left: "-" + getCurtainWidths().left + "px",
                    border: BORDER_SIZE + "px solid black"});

        $("#curtain-left").on('transitionend webkitTransitionEnd', function (e) {
            var leftCurtain = $(e.target);

            if (leftCurtain.hasClass("curtain-left-closed")) {
                $(e.target).css("display", "none");
            }
        });
    };

    var renderRightCurtain = function renderRightCurtain() {
        $("<div/>").appendTo("#home-page")
                .attr("id", "curtain-right")
                .addClass("curtain-right-closed")
                .css({
                    right: "-" + getCurtainWidths().right + "px",
                    border: BORDER_SIZE + "px solid black"});

        $("#curtain-right").on('transitionend webkitTransitionEnd', function (e) {
            var rightCurtain = $(e.target);

            if (rightCurtain.hasClass("curtain-right-closed")) {
                $(e.target).css("display", "none");
            }
        });
    };

    var getCurtainWidths = function getCurtainWidths() {
        var curtainWidths = {};
        var screenWidth = $(window).width();
        var leftCurtainHorizontalScreenRatio = null;

        if (screenWidth > 1100 && screenWidth < 1600) {
            leftCurtainHorizontalScreenRatio = 0.19;
        } else if (screenWidth > 700) {
            leftCurtainHorizontalScreenRatio = 0.17;
        } else {
            leftCurtainHorizontalScreenRatio = 0.35;
        }

        curtainWidths.left = screenWidth * leftCurtainHorizontalScreenRatio;
        curtainWidths.right = (screenWidth * (1 - leftCurtainHorizontalScreenRatio)) - BORDER_SIZE * 4;

        return curtainWidths;
    };

    return curtainJs();
});