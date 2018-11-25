$(document).ready(function () {
    // https://github.com/kenwheeler/slick/issues/359#issuecomment-50624066
    $.fn.randomize = function(selector){
        let $elems = selector ? $(this).find(selector) : $(this).children(),
            $parents = $elems.parent();

        $parents.each(function(){
            $(this).children(selector).sort(function(){
                return Math.round(Math.random()) - 0.5;
            }).detach().appendTo(this);
        });

        return this;
    };

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

    $(".slideshow-item").each(function (i) {
        let el = $(this);

        let bg = el.data("bg");
        let icon = el.data("icon");
        setTimeout(function () {
            el.find(".slideshow-item-background").css("background-image", "url('" + bg + "')");
        }, i * 500);
        if (icon) {
            setTimeout(function () {
                el.find(".slideshow-item-icon").css("background-image", "url('" + icon + "')");
            }, i * 1000);
        }

        let dragging = false;
        el.on('mousedown', (e) => {
            dragging = false;
        });
        el.on('mousemove', (e) => {
            dragging = true;
        });
        el.on('mouseup', (e) => {
            if (!dragging) {
                window.open(el.data("href") + "?utm_source=inventivetalent.org&utm_medium=slideshow", "_blank")
            }
        });
    });

    $(".slideshow").randomize(".slideshow-item");
    $(".slideshow").slick({
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3500,
        slidesToShow: 1,
        zIndex: 2
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
    });
});