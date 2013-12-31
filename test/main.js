/*global describe, it*/
"use strict";

var fs = require("fs"),
	es = require("event-stream"),
	expect = require("expect.js"),
	sinon = require("sinon"),
    path = require("path");

require("mocha");

var gutil = require("gulp-util"),
	protactor = require("../"),
	child_process = require('child_process'),
	events = require('events');


describe("gulp-protactor", function() {

	it("should pass the test-files to protactor via arg", function(done) {
        var fakeProcess = new events.EventEmitter();
		var spy = sinon.stub(child_process, 'spawn', function (cmd, args, options) {

            expect(path.basename(cmd)).to.equal('protractor');
            expect(path.basename(args[0])).to.equal('protactor.config.js');
            expect(args[1]).to.equal('--specs');
            expect(args[2]).to.equal('test/fixtures/test.js');

            child_process.spawn.restore();
            done();

            return new events.EventEmitter();
        });

		var srcFile = new gutil.File({
			path: "test/fixtures/test.js",
			cwd: "test/",
			base: "test/fixtures",
			contents: null
		});

		var stream = protactor({
			configFile: 'test/fixtures/protactor.config.js'
		});

		stream.write(srcFile);
		stream.end();

	});

	it("shouldn't pass the test-files to protactor if there are none", function(done) {
        var spy = sinon.stub(child_process, 'spawn', function (cmd, args, options) {

            expect(path.basename(cmd)).to.equal('protractor');
            expect(path.basename(args[0])).to.equal('protactor.config.js');
            expect(args[1]).to.be(undefined);
            expect(args[2]).to.be(undefined);

            child_process.spawn.restore();
            done();

            return new events.EventEmitter();
        });

        var srcFile = new gutil.File({
            path: "test/fixtures/test.js",
            cwd: "test/",
            base: "test/fixtures",
            contents: null
        });

        var stream = protactor({
            configFile: 'test/fixtures/protactor.config.js'
        });

        stream.end();

	});
});