var Curtain = function() {
    var BORDER_SIZE = 1;
    var CURTAIN_LEFT_WIDTH = 250;
    var CURTAIN_RIGHT_WIDTH = $(window).width() - CURTAIN_LEFT_WIDTH - BORDER_SIZE * 4;
    var CURTAIN_HEIGHT = $(window).height(); // subtract border pixels

    (function main() {
        initializeLeftCurtain();
        initializeRightCurtain();

        $("#open-btn").click(function() {
            open();
        });

        $("#back-btn").click(function() {
            close();
        });
    })();



    function initializeLeftCurtain() {
        $("<div/>").appendTo("#page1")
                .attr("id", "curtain-left")
                .addClass("curtain-left-closed")
                .height(CURTAIN_HEIGHT)
                .css({
                    left: "-" + (CURTAIN_LEFT_WIDTH + 4) + "px",
                    border: BORDER_SIZE + "px solid black"});

        $("#curtain-left").on('transitionend webkitTransitionEnd', function(e) {
            var leftCurtain = $(e.target);

            if (leftCurtain.hasClass("curtain-left-closed")) {
                $(e.target).css("display", "none");
            }
        });

    }

    function initializeRightCurtain() {
        $("<div/>").appendTo("#page1")
                .attr("id", "curtain-right")
                .addClass("curtain-right-closed")
                .height(CURTAIN_HEIGHT)
                .css({
                    right: "-" + (CURTAIN_RIGHT_WIDTH + 4) + "px",
                    border: BORDER_SIZE + "px solid black"});

        $("#curtain-right").on('transitionend webkitTransitionEnd', function(e) {
            var rightCurtain = $(e.target);

            if (rightCurtain.hasClass("curtain-right-closed")) {
                $(e.target).css("display", "none");
            }
        });
    }


    $(window).on('resize', function() {
        utils.close();
    });

    var utils = {
        close: function close() {
            var leftCurtainElQ = $("#curtain-left");
            var rightCurtainElQ = $("#curtain-right");

            leftCurtainElQ.removeClass("curtain-left-opened").addClass("curtain-left-closed").css("left", "-" + (CURTAIN_LEFT_WIDTH + BORDER_SIZE * 2) + "px");
            rightCurtainElQ.removeClass("curtain-right-opened").addClass("curtain-right-closed").css("right", "-" + (CURTAIN_RIGHT_WIDTH + BORDER_SIZE * 2) + "px");

        },
        open: function open() {
            var leftCurtainElQ = $("#curtain-left");
            var rightCurtainElQ = $("#curtain-right");

            CURTAIN_RIGHT_WIDTH = $(window).width() - CURTAIN_LEFT_WIDTH - BORDER_SIZE * 4;
            CURTAIN_HEIGHT = $(window).height(); // subtract border pixels

            leftCurtainElQ.removeClass("curtain-left-closed").css("display", "").addClass("curtain-left-opened").width(CURTAIN_LEFT_WIDTH).css("left", "0");
            rightCurtainElQ.removeClass("curtain-right-closed").css("display", "").addClass("curtain-right-opened").width(CURTAIN_RIGHT_WIDTH).css("right", "0");

        }
    }


    return utils;
}