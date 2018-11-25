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

        generatedSlideshowHtml += '\n<!-- Slide #' + (i + 1) + ' -->' +
            '\n<a class="slideshow-item" data-bg="' + slide.bg + '" data-icon="' + slide.icon + '" data-href="' + slide.href + '" href="' + slide.href + '?utm_source=inventivetalent.org&utm_medium=slideshow" title="' + slide.title + '" target="_blank">' +
            '\n  <div class="slideshow-item-background"></div>' +
            '\n  <div class="slideshow-item-content flow-text">' +
            '\n    <h2>' + slide.title + '</h2>' +
            '\n    <div class="slideshow-item-left">' +
            (slide.icon ? '      <div class="slideshow-item-icon"></div>' : '') +
            '\n    </div>' +
            '\n    <div class="slideshow-item-right">' +
            '\n      <div class="slideshow-item-text flow-text">' +
            '\n        <p>' + (slide.description || "") + '</p>' +
            '\n      </div>' +
            '\n    </div>' +
            '\n  </div>' +
            '\n</a>' +
            '\n'
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

