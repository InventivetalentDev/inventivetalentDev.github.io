let fs = require("fs");
let path = require("path");

console.log("Reading slideshow data...")
fs.readFile(path.join(__dirname, "../slideshow.json"), "utf-8", function (err, slideshowContent) {
    if (err) {
        return console.error(err);
    }
    slideshowContent = JSON.parse(slideshowContent);

    let generatedSlideshowHtml = "";
    for (let i = 0; i < slideshowContent.length; i++) {
        let slide = slideshowContent[i];

        let languageStr = "";
        for (let j = 0; j < slide.languages.length; j++) {
            let lang = slide.languages[j];

            languageStr += '<div class="language" title="' + lang + '">';

            if (lang.toLowerCase() === "javascript") {
                languageStr += '<i class="fab fa-js"></i>'
            } else if (lang.toLowerCase() === "java") {
                languageStr += '<i class="fab fa-java"></i>'
            } else if (lang.toLowerCase() === "html" || lang.toLowerCase() === "html5") {
                languageStr += '<i class="fab fa-html5"></i>'
            } else if (lang.toLowerCase() === "android") {
                languageStr += '<i class="fab fa-android"></i>'
            } else if (lang.toLowerCase() === "nodejs") {
                languageStr += '<i class="fab fa-node-js"></i>'
            } else if (lang.toLowerCase() === "css" || lang.toLowerCase() === "css3") {
                languageStr += '<i class="fab fa-css3"></i>'
            // } else if (lang.toLowerCase() === "kotlin") {
            //     languageStr += '<i class="fab fa-kotlin"></i>'
            } else if (lang.toLowerCase() === "vue.js") {
                languageStr += '<i class="fab fa-vuejs"></i>'
            } else if (lang.toLowerCase() === "php") {
                languageStr += '<i class="fab fa-php"></i>'
            } else {
                languageStr += slide.languages[j];
            }

            languageStr += '</div>';
        }

        generatedSlideshowHtml += '\n <div class="project-wrapper col s12 m6 l4">\n' +
            '                    <div class="project-card slideshow-item card blue-grey darken-1" data-href="' + slide.href + '">\n' +
            '                        <div class="white-text">\n' +
            '                            <img class="card-bg" src="' + slide.bg + '">\n' +
            '                            <span class="card-title">' + slide.title + '</span>\n' +
            '                            <img class="card-icon" src="' + slide.icon.replace("%cdn%", "https://res.cloudinary.com/inventivetalent/image/upload/") + '">\n' +
            '                            <p class="card-text">' + (slide.description || "") + '</p>\n' +
            '                            <div class="project-languages">\n' +
            languageStr + '\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>';

        // generatedSlideshowHtml += '\n<!-- Slide #' + (i + 1) + ' -->' +
        //     '\n<a class="slideshow-item" data-bg="' + slide.bg + '" data-icon="' + slide.icon + '" data-href="' + slide.href + '" href="' + slide.href + '?utm_source=inventivetalent.org&utm_medium=slideshow" title="' + slide.title + '" target="_blank">' +
        //     '\n  <div class="slideshow-item-background"></div>' +
        //     '\n  <div class="slideshow-item-content flow-text">' +
        //     '\n    <h2>' + slide.title + '</h2>' +
        //     '\n    <div class="slideshow-item-left">' +
        //     (slide.icon ? '      <div class="slideshow-item-icon"></div>' : '') +
        //     '\n    </div>' +
        //     '\n    <div class="slideshow-item-right">' +
        //     '\n      <div class="slideshow-item-text flow-text">' +
        //     '\n        <p>' + (slide.description || "") + '</p>' +
        //     '\n      </div>' +
        //     '\n    </div>' +
        //     '\n  </div>' +
        //     '\n</a>' +
        //     '\n'
    }

    console.log("Reading original index.html...");
    fs.readFile(path.join(__dirname, "../index-raw.html"), "utf-8", function (err, indexContent) {
        if (err) {
            return console.error(err);
        }
        let newContent = indexContent.replace("<!-- ###slideshow$$$ -->", generatedSlideshowHtml);
        newContent = newContent.replace("###genInfo$$$", "index.html generated on " + new Date());

        console.log("Writing generated html to index.html...");
        fs.writeFile(path.join(__dirname, "../index.html"), newContent, "utf-8", function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("Done!")
        })
    });

});

