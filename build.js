const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const package = require('./package.json');

const version = package.version;
const manifest = {
  manifest_version: 2,

  name: 'GitHub PR header',
  description: 'This extension pins the file header to the top of the page when reviewing pull requests on GitHub.',
  version,

  content_scripts: [{
    matches: ['*://github.com/*/*/pull/*/files'],
    js: ['index.js']
  }]
}

const zip = fs.createWriteStream('browser-extension.zip');
const archive = archiver('zip');

archive.pipe(zip);
archive.append(JSON.stringify(manifest, false, 2), { name: 'manifest.json' });
archive.file('index.js');
archive.finalize();
