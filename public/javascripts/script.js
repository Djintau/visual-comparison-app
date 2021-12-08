webvis.changeSetting("brandingURL", "");
webvis.changeSetting("brandingLabel", "");
webvis.changeSetting("disableDefaultInteraction", true);

let testFilename = "";
const context = webvisContext();

// show notification
function showNotification() {
    $(".notification").show();
    setTimeout(function () {
        $(".notification").hide();
    }, 3000);
}

// change handler for file select
$("#selectTest").change(function() {
    testFilename = $(this).val() ? $(this).val().slice(0, -3) : "";
})

// click handler for image download
$("#downloadImage").click(function() {
    if (testFilename) {
        context.getViewer().requestScreenshot().then(screenshot => {
            $.post("/", { image: screenshot, fileName: testFilename, action: 'download'}).done(() => {
                showNotification();
            });
        });
    }
})

// test runner
$("#runTest").click(function () {
    if(testFilename){
        webvis.reset();
        $("#base").remove();
        $("#diff").remove();
        $("#diffPercent").html("");
        const script = `./tests/${testFilename}.js`;
        $.getScript(script, async function () {
            await test(context)
            await context.waitFor('renderingFinished')
            await context.getViewer().requestScreenshot().then(screenshot => {
                $.post("/", { image: screenshot, fileName: testFilename, destination: 'results', action: 'download'}).done(() => {
                    $.post("/", { image: screenshot, fileName: testFilename, destination: 'results', action: 'diff' }).done((res) => {
                        $("#groundTruth").append(`<img id="base" src="./images/base/${testFilename}.png">`);
                        $("#errorImage").append(`<img id="diff" src="./images/diffs/${testFilename}.png">`);
                        $("#diffPercent").html(`Difference: ${res.diff}`);
                    });
                });
            });
        });
    } 
})