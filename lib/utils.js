const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

const baseImgPath = './public/images/base/';
const resultsImgPath = './public/images/results/';
const diffsImgPath = './public/images/diffs/';

// function to create array of file names that are in a folder
// args: testFolder - path of the test folder
exports.testsList = (testFolder) => {
    return fs.readdirSync(testFolder, { withFileTypes: true })
        .filter(item => !item.isDirectory())
        .map(item => item.name);
}

// function to save image data to a file
// args:
// * img - base64 data of an image
// * fileName - name of the file without extension
exports.saveImageFile = (img, fileName, destination = 'base') => {
    const path = [baseImgPath,resultsImgPath,diffsImgPath].filter(x => x.includes(destination));
    const data = img.replace(/^data:image\/\w+;base64,/, "");
    const buf = Buffer.from(data, 'base64');
    fs.writeFileSync(`${path}${fileName}.png`, buf, (err) => {
        if (err)
            console.log(err);
        else {
            console.log(`File ${fileName}.png written successfully`);
        }
    });
}

// function to create and write diff image, and return difference in pixels
// args:
// * fileName - name of the file without extension
exports.imageDiff = (fileName) => {
    const img1 = PNG.sync.read(fs.readFileSync(`${baseImgPath}${fileName}.png`));
    const img2 = PNG.sync.read(fs.readFileSync(`${resultsImgPath}${fileName}.png`));
    const { width, height } = img1;
    const diff = new PNG({ width, height });

    // number of diff pixels between base and results image
    const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height,
        { threshold: 0.1, diffMask: true, diffColorAlt: [255, 0, 0], diffColor: [0, 255, 0], includeAA: true });

    const diffResult = 100 * numDiffPixels/(width * height);

    fs.writeFileSync(`${diffsImgPath}${fileName}.png`, PNG.sync.write(diff));

    return diffResult;
}