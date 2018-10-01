(function () {
    document.getElementById("separator_line_right").addEventListener("animationend", function () {
        setTimeout(function () {
            $(".upper-content").addClass("visible");
        }, 100);
        $(".slideshow-content")[0].addEventListener("transitionend", function (event) {
            $(".slideshow").slick('slickGoTo', 0, true);
        }, false);
        setTimeout(function () {
            $(".slideshow-content").addClass("visible");

            $(".avatar-img").addClass("visible");
        }, 400);
        setTimeout(function () {
            $(".lower-content").addClass("visible");
        }, 600);
        setTimeout(function () {
            $(".contact-content").addClass("visible");
        }, 800);
        setTimeout(function () {
            $(".embed-content").addClass("visible");
            $(".embed").fadeIn();
        }, 1000);
        setTimeout(function () {
            $("footer").addClass("visible");
        }, 1200);
    }, false);
})();