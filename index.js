'use strict';

function HtmlWebpackBannerPlugin(options)
{
	this.options = options || {};
}

HtmlWebpackBannerPlugin.prototype.apply = function (compiler)
{
	var banner = this.options.banner || '';
	var raw = this.options.raw;
	var event = 'html-webpack-plugin-after-html-processing';
	var hook = 'htmlWebpackPluginAfterHtmlProcessing';

	// Backwards compatible
	(compiler.hooks ?
			compiler.hooks.compilation.tap.bind(compiler.hooks.compilation, 'HtmlWebpackBannerPlugin') :
			compiler.plugin.bind(compiler, 'compilation')
	)(function (compilation)
	{
		// Backwards compatible
		(compiler.hooks ?
				compilation.hooks[hook].tap.bind(compilation.hooks[hook], 'HtmlWebpackBannerPlugin') :
				compilation.plugin.bind(compilation, event)
		)(function (htmlPluginData, callback)
		{
			var comment = banner && !raw ? '<!--' + banner + '-->\n' : banner;

			htmlPluginData.html = comment + htmlPluginData.html;

			if(callback)
			{
				callback(null, htmlPluginData);
			}
			else
			{
				return htmlPluginData;
			}
		});
	})
};

module.exports = HtmlWebpackBannerPlugin;
