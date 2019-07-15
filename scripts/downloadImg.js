var fs = require('fs'),
  request = require('request');

let rawdata = fs.readFileSync('../src/assets/funko.json');
let funko = JSON.parse(rawdata);

let download = function(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri)
      .pipe(fs.createWriteStream(`../src/assets/images/${filename}`))
      .on('close', callback);
  });
};

funko.forEach(f => {
  console.log(f);
  if (f.picture) {
    const pict = Array.isArray(f.picture) ? f.picture[0] : f.picture;
    download(pict, `${f.guid}.jpg`, function() {
      console.log(f.name);
    });
  }
});
