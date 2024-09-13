const createTestCafe = require('testcafe');

let testCafe = null;
let url = null;
const env = "prod"

switch (env) {
    case 'dev':
        // example for the different environments
        break;
    case 'prod':
        console.log('Running tests in PROD')
        url = "https://www.saucedemo.com/"
        break;
    default:
        console.log(`unknown environment input: ${env}`)
}


createTestCafe('localhost')
    .then(tc => {
        testCafe = tc;
        const runner = testCafe.createRunner();

        return runner
            .src("./tests/*_test.js")
            .browsers(['chrome'])
            .concurrency(1) // This will be adjusted once more tests are added
            .reporter(['spec', {
                name: 'html',
                output: './tests/artifacts/report.html'
            }])
            .screenshots({
                path: './tests/artifacts/screenshots/',
                takeOnFails: true,
                pathPattern: '${DATE}_${TIME}/test-${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}.png',
                fullPage: true,
                thumbnails: false
            })
            .run({
                baseUrl: url,
                skipJsErrors: true,
                quarantineMode: false, // This would be true in the pipeline
                stopOnFirstFail: true,
                speed: 0.9 // This is used for debugging
            });
    })
    .then(failedCount => {
        console.log('Tests failed: ' + failedCount);
        testCafe.close();
    });