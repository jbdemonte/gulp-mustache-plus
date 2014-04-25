'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var mustache = require('mustache');
var fs = require('fs');

function isFile(str) {
  return !str.match("\n") && fs.existsSync(str);
}

module.exports = function (view, options, partials) {
  options = options || {};
  options.extension = options.extension || '.html';
  partials = partials || {};

  var key,
    viewError = null,
    keys = [],
    new_partials = {};

  for (key in partials) {
    keys.push(key);
    new_partials[key] = partials[key];
  }

  // if view is string, interpret as path to json filename
  if (typeof view === 'string') {
    try {
      view = JSON.parse(fs.readFileSync(view, 'utf8'));
    } catch (e) {
      viewError = e;
    }
  }

  return through.obj(function (file, enc, cb) {
    var self = this;

    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit(
        'error',
        new gutil.PluginError('gulp-mustache-plus', 'Streaming not supported')
      );
    }

    if (viewError) {
      this.emit(
        'error',
        new gutil.PluginError('gulp-mustache-plus', viewError.toString())
      );
    }


    function checkFiles() {
      var key = keys.shift();
      if (key) {
        if (isFile(new_partials[key])) {
          fs.readFile(new_partials[key], function (err, data) {
            if (err) {
              throw new Error("Error reading file (" + new_partials[key] + ")");
            } else {
              new_partials[key] = (options.file_prepend || "") + data.toString();
            }
            checkFiles();
          });
        } else {
          checkFiles();
        }
      } else {
        file.contents = new Buffer(mustache.render(file.contents.toString(), view, new_partials));
        file.path = gutil.replaceExtension(file.path, options.extension);
        self.push(file);
        cb();
      }
    }

    checkFiles();
  });
};
