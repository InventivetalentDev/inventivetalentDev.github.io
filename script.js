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


    let dragging = false;

    $.ajax("./slideshow.json").done(function (slideData) {
        $.each(slideData, function (i, slide) {
            let el = $('' +
                '<a class="slideshow-item" data-href="' + slide.href + '" href="' + slide.href + '?utm_source=inventivetalent.org&utm_medium=slideshow" target="_blank">' +
                '  <div class="slideshow-item-background"></div>' +
                '  <div class="slideshow-item-content flow-text">' +
                '    <h2>' + slide.title + '</h2>' +
                '    <div class="slideshow-item-left">' +
                (slide.icon ? '      <div class="slideshow-item-icon"></div>' : '') +
                '    </div>' +
                '    <div class="slideshow-item-right">' +
                '      <div class="slideshow-item-text flow-text">' +
                '        <p>' + (slide.description || "") + '</p>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</a>' +
                '');
            el.appendTo($(".slideshow"));

            setTimeout(function () {
                el.find(".slideshow-item-background").css("background-image", "url('" + slide.bg + "')");
            }, i * 500);
            if (slide.icon) {
                setTimeout(function () {
                    el.find(".slideshow-item-icon").css("background-image", "url('" + slide.icon + "')");
                }, i * 1000);
            }

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
            autoplaySpeed: 3500,
            slidesToShow: 1,
            zIndex: 2
        })

    });

    let avatar = $("#mercy");
    avatar.attr("src", avatar.data("src"));

    let voicelines = [];
    $.ajax("https://api.github.com/repos/Js41637/Overwatch-Item-Tracker/contents/resources/heroes/mercy/voicelines").done(function (vs) {
        for (let i = 0; i < vs.length; i++) {
            voicelines.push(vs[i].path)
        }
    })
    avatar.click(function () {
        new Audio("https://cdn.rawgit.com/Js41637/Overwatch-Item-Tracker/development/" + voicelines[Math.floor(Math.random() * voicelines.length)]).play();
    })

})