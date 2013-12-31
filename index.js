var es = require("event-stream");
var path = require("path");
var child_process = require('child_process');

module.exports = function(options) {
	var files = [], child;
	options = options || {};
	if(!options.configFile) {
		throw new Error('Please specify the protractor config file');
	}
	return es.through(function (file) {
		files.push(file.path);
	}, function () {
		var args = [path.resolve(options.configFile)], stream = this;
		// Attach Files, if any
		if(files.length) {
			args.push("--specs");
			args.push(files.join(","));
		}

		child = child_process.spawn(path.resolve("./node_modules/.bin/protractor"), args, {
			stdio: "inherit"
		}).on("exit", function () {
			if (child) child.kill();
			if (stream) stream.emit("end");
		});
	});

};