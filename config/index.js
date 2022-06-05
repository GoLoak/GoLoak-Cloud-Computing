'use strict';
const path = require('path');

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// For more information on ways to initialize Storage, please see
// https://googleapis.dev/nodejs/storage/latest/Storage.html

// Creates a client using Application Default Credentials
const keyJson = path.join(__dirname, './goloak-aa39fcc6c492.json');

// Creates a client from a Google service account key
// const storage = new Storage({keyFilename: ''});
const cloudStorage = new Storage({
    keyFilename: keyJson,
    projectId: 'goloak',
});

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// The ID of your GCS bucket
const bucketName = 'storage_goloak';

module.exports = { cloudStorage }