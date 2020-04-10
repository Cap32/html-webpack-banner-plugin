'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');

class HtmlWebpackBannerPlugin {
	constructor(options) {
		this.options = options || {};
	}

	apply(compiler) {
		const banner = this.options.banner || '';
		const raw = this.options.raw;

		compiler.hooks.compilation.tap('HtmlWebpackBannerPlugin', compilation => {
			const hooks = HtmlWebpackPlugin.getHooks(compilation);

			hooks.afterTemplateExecution.tapAsync(
				'HtmlWebpackBannerPlugin',
				(htmlPluginData, cb) => {
					const comment = banner && !raw ? '<!--' + banner + '-->\n' : banner;

					htmlPluginData.html = `${comment}${htmlPluginData.html}`;
					cb(null, htmlPluginData);
				}
			);
		});
	}
}

module.exports = HtmlWebpackBannerPlugin;
