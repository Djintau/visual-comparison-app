const express = require('express');
const router = express.Router();
const utils = require('../lib/utils')

const testFolder = './public/tests';

/* GET index page */
router.get('/', function(req, res) {
    res.render('index', { title: 'Visual Comparison', tests: utils.testsList(testFolder)});
});

/* POST to save the base image data to a file 
   or to save result image data to a file and
   create a diff image */
router.post('/', function (req, res) {
    let numDiffPixels = 0;
    if(req.body.action === "download"){
        utils.saveImageFile(req.body.image, req.body.fileName, req.body.destination)
    } else if(req.body.action === "diff") {
        numDiffPixels = utils.imageDiff(req.body.fileName)
    } else {
        console.log("Unknown action");
    }
    res.send({ diff: `${numDiffPixels.toPrecision(8)}%`})
});

module.exports = router;
