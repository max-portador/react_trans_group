// require('isomorphic-fetch');
var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: 'YOUR_ACCESS_TOKEN_HERE' });
dbx.filesListFolder({path: ''})
    .then(function(response: any) {
        console.log(response);
    })
    .catch(function(error: any) {
        console.log(error);
    });