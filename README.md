# html-webpack-banner-plugin

[![Build Status](https://travis-ci.org/Cap32/html-webpack-banner-plugin.svg?branch=master)](https://travis-ci.org/Cap32/html-webpack-banner-plugin)

This is an extension plugin for the [webpack](http://webpack.github.io) plugin [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) - a plugin that simplifies the creation of HTML files to serve your webpack bundles.

Adds a banner to the top of generated html.


## Installation

Install the plugin with npm:

```bash
$ npm install -d html-webpack-banner-plugin
```

Install the plugin with yarn:

```bash
$ yarn add -D html-webpack-banner-plugin
```


## Basic Usage

Load the plugin

```js
const HtmlWebpackBannerPlugin = require('html-webpack-banner-plugin');
```

and add it to your webpack config as follows:

```js
plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackBannerPlugin({
        banner: '<!-- my banner -->',
    }),
]
```

#### Options

```js
{
    banner: string, // the banner as string, it will be wrapped in a comment
    raw: boolean, // if true, banner will not be wrapped in a comment
}
```

## License

MIT

