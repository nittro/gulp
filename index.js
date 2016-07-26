var Builder = require('nittro'),
    fs = require('fs'),
    Readable = require('stream').Readable,
    File = require('vinyl');

var nittro = function(type, options) {
    var builder = options instanceof Builder ? options : new Builder(options),
        files = builder.getFileList(type),
        src = Readable({ objectMode: true });

    src._read = function() {
        if (!files.length) {
            return src.push(null);
        }

        var file = files.shift();

        if (type === 'js' && file === '__bootstrap-generated.js') {
            src.push(new File({
                cwd: '',
                base: '',
                path: file,
                contents: new Buffer(builder.buildBootstrap())
            }));

        } else {
            fs.readFile(file, function(err, data) {
                if (err) {
                    throw err;
                }

                src.push(new File({
                    cwd: '',
                    base: '',
                    path: file,
                    contents: data
                }));
            });
        }
    };

    return src;

};


nittro.Builder = Builder; // reexport

module.exports = nittro;
