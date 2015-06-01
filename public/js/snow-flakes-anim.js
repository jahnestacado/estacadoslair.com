require(["jquery"], function ($) {
    /*
     * Initial code was taken from:
     * http://tympanus.net/codrops/2014/09/23/animated-background-headers/
     * and further optimized and refactored
     */
    $(document).ready(function () {
        var width;
        var height;
        var ctx;
        var animationIntervalRef;
        var PI_TIMES2 = 2 * Math.PI;

        // Main
        initHeader();
        addListeners();

        function initHeader() {
            width = window.innerWidth;
            height = window.innerHeight;
            var largeHeader = document.getElementById("home-page");
            largeHeader.style.height = height + "px";

            var canvas = document.getElementById("demo-canvas");
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext("2d");

            // create particles
            var circles = [];
            for (var x = 0; x < width; x += 1.5) {
                circles.push(new Circle());
            }

            var drawCircles = function drawCircles() {
                ctx.clearRect(0, 0, width, height);
                for (var i = 0, length = circles.length - 1; i <= length; i++) {
                    circles[i].draw();
                }
            }

            animationIntervalRef = setInterval(drawCircles, 50);
        }

        // Canvas manipulation
        function Circle() {
            var _this = this;

            // constructor
            (function () {
                init();
            })();

            function init() {
                _this.x = roundTo1Decimals(Math.random() * width, 1);
                _this.y = roundTo1Decimals(height + Math.random() * 100, 1);
                _this.alpha = 0.2 + Math.random() * 0.3;
                _this.scale = roundTo1Decimals(0.1 + Math.random() * 0.3, 1) * 10;
                _this.velocity = roundTo1Decimals(Math.random(), 1);
            }

            this.draw = function () {
                //Re-initialize circles when they reach the middle of the screen
                if (_this.y < height / 2) {
                    init();
                }
                _this.y -= _this.velocity;
                ctx.beginPath();
                ctx.arc(_this.x, _this.y, _this.scale, 0, PI_TIMES2, false);
                ctx.fillStyle = "rgba(255,255,255," + _this.alpha + ")";
                ctx.fill();
            };
        }

        // Event handling
        function addListeners() {
            window.addEventListener("resize", resize);
        }

        function resize() {
            initHeader();
            clearInterval(animationIntervalRef);
        }

        function roundTo1Decimals(number) {
            return Math.round(number * 10) / 10;
        }
    });

});
