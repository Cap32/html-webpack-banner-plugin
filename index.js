'use strict';

function HtmlWebpackBannerPlugin(options) {
	this.options = options || {};
}

HtmlWebpackBannerPlugin.prototype.apply = function (compiler) {
	var banner = this.options.banner || '';
	var raw = this.options.raw;
	var processingEvent = 'html-webpack-plugin-after-html-processing';
	var processingHook = 'htmlWebpackPluginAfterHtmlProcessing';
	var pluginHook = 'HtmlWebpackBannerPlugin';
	var callCompilation;

	// Backwards compatible
	if (compiler.hooks) {
		var compilation = compiler.hooks.compilation;
		callCompilation = compilation.tap.bind(compilation, pluginHook);
	}
	else {
		callCompilation = compiler.plugin.bind(compiler, 'compilation');
	}

	callCompilation(function (compilation) {
		var callProcess;

		// Backwards compatible
		if (compiler.hooks) {
			var processing = compilation.hooks[processingHook];
			callProcess = processing.tap.bind(processing, pluginHook);
		}
		else {
			callProcess = compilation.plugin.bind(compilation, processingEvent);
		}

		callProcess(function (htmlPluginData, callback) {
			var comment = banner && !raw ? '<!--' + banner + '-->\n' : banner;

			htmlPluginData.html = comment + htmlPluginData.html;

			if (callback) {
				callback(null, htmlPluginData);
			}
			else {
				return htmlPluginData;
			}
		});
	});
};

module.exports = HtmlWebpackBannerPlugin;
