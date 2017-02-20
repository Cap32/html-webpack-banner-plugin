
'use strict';

var path = require('path');
var fs = require('fs');
var rimraf = require('rimraf');
var assert = require('assert');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackBannerPlugin = require('../');

function inDir(pathname) {
	return path.resolve(__dirname, pathname);
}

function config(options) {
	return {
		entry: inDir('entry.js'),
		output: {
			path: inDir('dist'),
		},
		plugins: [
			new HtmlWebpackPlugin(),
			new HtmlWebpackBannerPlugin(options),
		],
	};
}

describe('html-webpack-banner-plugin', function () {
	afterEach(function () {
		rimraf.sync(inDir('dist'));
	});

	it('banner', function (done) {
		var banner = 'it works';
		webpack(config({
			banner: banner,
		}), function (err) {
			var htmlFile = inDir('dist/index.html');
			var html = fs.readFileSync(htmlFile, 'utf-8');
			var regExp = new RegExp('^<\!--' + banner + '-->');
			assert(regExp.test(html));
			assert(!err);
			done();
		});
	});

	it('raw: false', function (done) {
		var banner = '<!-- it works -->';
		webpack(config({
			banner: banner,
			raw: true,
		}), function (err) {
			var htmlFile = inDir('dist/index.html');
			var html = fs.readFileSync(htmlFile, 'utf-8');
			var regExp = new RegExp('^' + banner);
			assert(regExp.test(html));
			assert(!err);
			done();
		});
	});
});
