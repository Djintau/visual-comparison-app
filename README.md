# visual-comparison-app
 Visual comparison of rendered content and expected resulting image.

 ## Basic Usage

From root directory of this project:
- run `npm install` to install the dependencies specified in package.json
- to run the application use command `npm start` from your terminal
- you will need to create 2 directories under `public/images`: `diffs` and `results`
- to run the application with hot reload you need to install nodemon `npm install -g nodemon` and then
  you can run the application with `DEBUG=visual-comparison-app:* nodemon --exec npm start`
- go to `http://localhost:3000/` in your browser

## Features

- base images are already generated and saved in `public/images/base` but you can overwrite them
  by using `Download` button (there should be a notification to confirm that the file has been saved)
- list of test files is dynamically loaded from `public/tests` folder

Upon running the test:
- new 3d view will be generated and compared with base image
- 3d view will be saved as image under `public/images/results`
- diff will be saved under `public/images/diffs`
- difference in pixels between result and base image will be shown as percentage

There are 2 tests at the moment:
- `test1.js` represents success
- `test2.js` represents failure to see the diff representation

