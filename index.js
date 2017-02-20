
'use strict';

function HtmlWebpackBannerPlugin(options) {
	this.options = options || {};
}

HtmlWebpackBannerPlugin.prototype.apply = function (compiler) {
	var banner = this.options.banner || '';
	var raw = (this.options.raw !== false);
	var event = 'html-webpack-plugin-after-html-processing';
	compiler.plugin('compilation', function (compilation) {
		compilation.plugin(event, function (htmlPluginData, callback) {
			var comment = banner && !raw ? '<!--' + banner + '-->\n' : banner;
			htmlPluginData.html = comment + htmlPluginData.html;
			callback(null, htmlPluginData);
		});
	});
};

module.exports = HtmlWebpackBannerPlugin;
