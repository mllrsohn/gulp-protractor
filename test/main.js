/*global describe, it*/
'use strict';

var fs = require('fs'),
    es = require('event-stream'),
    expect = require('expect.js'),
    sinon = require('sinon'),
    path = require('path');

require('mocha');

var gutil = require('gulp-util'),
    protactor = require('../').protractor,
    webdriver = require('../').webdriver,
    child_process = require('child_process'),
    events = require('events');


describe('gulp-protactor: protactor', function() {

    it('should pass in the args into the protactor call', function(done) {
        var fakeProcess = new events.EventEmitter();
        var spy = sinon.stub(child_process, 'spawn', function(cmd, args, options) {

            expect(path.basename(cmd)).to.equal('protractor');
            expect(path.basename(args[0])).to.equal('protactor.config.js');
            expect(args[1]).to.equal('--browser');
            expect(args[2]).to.equal('Chrome');
            expect(args[3]).to.equal('--chrome-only');
            child_process.spawn.restore();
            done();

            return new events.EventEmitter();
        });
        var srcFile = new gutil.File({
            path: 'test/fixtures/test.js',
            cwd: 'test/',
            base: 'test/fixtures',
            contents: null
        });

        var stream = protactor({
            configFile: 'test/fixtures/protactor.config.js',
            args: {
                browser: 'Chrome',
                chromeOnly: true
            }
        });

        stream.write(srcFile);
        stream.end();
    });


    it('should pass in debug if debug is true', function(done) {
        var fakeProcess = new events.EventEmitter();
        var spy = sinon.stub(child_process, 'spawn', function(cmd, args, options) {

            expect(path.basename(cmd)).to.equal('protractor');
            expect(path.basename(args[0])).to.equal('debug');
            expect(path.basename(args[1])).to.equal('protactor.config.js');
            child_process.spawn.restore();
            done();

            return new events.EventEmitter();
        });

        var stream = protactor({
            configFile: 'test/fixtures/protactor.config.js',
            debug: true
        });

        stream.end();
    });
    it('should pass the test-files to protactor via arg', function(done) {
        var fakeProcess = new events.EventEmitter();
        var spy = sinon.stub(child_process, 'spawn', function(cmd, args, options) {

            expect(path.basename(cmd)).to.equal('protractor');
            expect(path.basename(args[0])).to.equal('protactor.config.js');
            expect(args[1]).to.equal('--specs');
            expect(args[2]).to.equal('test/fixtures/test.js');

            child_process.spawn.restore();
            done();

            return new events.EventEmitter();
        });

        var srcFile = new gutil.File({
            path: 'test/fixtures/test.js',
            cwd: 'test/',
            base: 'test/fixtures',
            contents: null
        });

        var stream = protactor({
            configFile: 'test/fixtures/protactor.config.js'
        });

        stream.write(srcFile);
        stream.end();

    });

    it('shouldnt pass the test-files to protactor if there are none', function(done) {
        var spy = sinon.stub(child_process, 'spawn', function(cmd, args, options) {

            expect(path.basename(cmd)).to.equal('protractor');
            expect(path.basename(args[0])).to.equal('protactor.config.js');
            expect(args[1]).to.be(undefined);
            expect(args[2]).to.be(undefined);

            child_process.spawn.restore();
            done();

            return new events.EventEmitter();
        });

        var srcFile = new gutil.File({
            path: 'test/fixtures/test.js',
            cwd: 'test/',
            base: 'test/fixtures',
            contents: null
        });

        var stream = protactor({
            configFile: 'test/fixtures/protactor.config.js'
        });

        stream.end();

    });

    it('should propogate protactor exit code', function(done) {
        var fakeProcess = new events.EventEmitter();
        var spy = sinon.stub(child_process, 'spawn', function(cmd, args, options) {
            child_process.spawn.restore();
            process.nextTick(function() { fakeProcess.emit('exit', 255) });
            fakeProcess.kill = function() {};
            return fakeProcess;
        });

        var srcFile = new gutil.File({
            path: 'test/fixtures/test.js',
            cwd: 'test/',
            base: 'test/fixtures',
            contents: null
        });

        var stream = protactor({
            configFile: 'test/fixtures/protactor.config.js'
        });

        stream.write(srcFile);
        stream.end();
        stream.on('error', function(err) {
            done();
        })
    });
});


describe('gulp-protactor: webdriver', function() {

    it('should call update and then start on the webdriver-manager', function(done) {

        var fakeProcess = new events.EventEmitter();
        var seconds_call = false;
        var spy = sinon.stub(child_process, 'spawn', function(cmd, args, options) {
            expect(path.basename(cmd)).to.equal('webdriver-manager');
            if (!seconds_call) {
                expect(args[0]).to.equal('update');
            } else {
                expect(args[0]).to.equal('start');
                child_process.spawn.restore();
                done();
            }
            return fakeProcess;
        });

        var wd = webdriver();
        setTimeout(function() {
            seconds_call = true;
            fakeProcess.emit('close');
        }, 100);


    });
});