$(document).ready(function () {
    $(this).scrollTop(0);

    $(".modal").modal();
    if (location.hash.length > 0) {
        if ("#imprint" === location.hash) {
            M.Modal.getInstance($("#imprint-modal")).open();
        }
    }

    $(".language").click(function () {
        window.open("https://google.com/search?q=" + $(this).text().trim(), "_blank");
    });

    document.getElementById("separator_line_right").addEventListener("animationend", function () {
        setTimeout(function () {
            $(".upper-content").addClass("visible");
        }, 100);
        $(".slideshow-item")[0].addEventListener("transitionend", function (event) {
            $(".slideshow").slick('slickGoTo', 0, true);
        }, false);
        setTimeout(function () {
            $(".slideshow-content").addClass("visible");
            $(".slideshow-item").addClass("visible");

            $(".avatar-img").addClass("visible");
            // $(".fadeInBtn").addClass("visible");
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


    let dragging = false;

    $.ajax("./slideshow.json").done(function (slideData) {
        $.each(slideData, function (i, slide) {
            let el = $('' +
                '<div class="content slideshow-item" data-href="' + slide.href + '">' +
                '  <div class="slideshow-item-background" style="background-image: url(\'' + slide.bg + '\');"></div>' +
                '  <div class="slideshow-item-content flow-text">' +
                '    <h2>' + slide.title + '</h2>' +
                '    <div class="slideshow-item-left">' +
                (slide.icon ? '      <div class="slideshow-item-icon" style="background-image: url(\'' + slide.icon + '\')"></div>' : '') +
                '    </div>' +
                '    <div class="slideshow-item-right">' +
                '      <div class="slideshow-item-text flow-text">' +
                '        <p>' + (slide.description || "") + '</p>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</div>' +
                '');
            el.appendTo($(".slideshow"))

            el.on('mousedown', (e) => {
                dragging = false;
            });
            el.on('mousemove', (e) => {
                dragging = true;
            });
            el.on('mouseup', (e) => {
                if (!dragging) {
                    window.open(slide.href + "?utm_source=inventivetalent.org&utm_medium=slideshow", "_blank")
                }
            });
        })

        $(".slideshow").slick({
            arrows: false,
            autoplay: true,
            autoplaySpeed: 5000,
            slidesToShow: 1,
            zIndex: 2
        })

    });

    let voicelines = [];
    $.ajax("https://api.github.com/repos/Js41637/Overwatch-Item-Tracker/contents/resources/heroes/mercy/voicelines").done(function (vs) {
        for (let i = 0; i < vs.length; i++) {
            voicelines.push(vs[i].path)
        }
    })
    $("#mercy").click(function () {
        new Audio("https://cdn.rawgit.com/Js41637/Overwatch-Item-Tracker/development/" + voicelines[Math.floor(Math.random() * voicelines.length)]).play();
    })

})