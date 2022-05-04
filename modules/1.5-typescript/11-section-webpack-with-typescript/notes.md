## What is and Why do we need it?

We have this problems:
- Multiple files & imports.
- Unoptimized code (not as small as possible).
- External development server need it (little-server and doesn't reload).

However with webpack we can solve it.

## How to install it?

We can use npm to install webpack and to work with typescript we have to install with npm:

- webpack: The heart of webpack
- webpack-cli: Allow us how to configure our webpack project
- ts-loader: Load typescript compile it and bundled javascript code.
- webpack-dev-server: quickly develop an application

## Configure our webpack

We can configure using `webpack.config.js`

```javascript
const path = require('path');

module.exports = {
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map', // there will be generated source maps already and bundle together. NOTE: You need to have source-map in tsconfig.json activated

  module:{
    rules:[
      {
        test: /\.ts$/, //select which files to use
        use: 'ts-loader', // should be handled by ts-loader
        exclude: /node_modules/ 
      }
    ]
  },
  resolve:{
    extensions:['ts','js'] //which files are going to import and bundled together
  }
};
```
## How to start the project

We can add an script in package.json

```json
{
    "scripts":{
        "build":"webpack"
    }
}
```

And run

```bash
npm run build
```

## How to use webpack-dev-server

When we are working with webpack-dev-server we are not working with `/dist/bundle.js` file but a file in memory, and we need an extra configuration in `webpack.config.js`.

```javascript
module.exports ={
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    public: 'dist' // this is the extra configuration
  }
}
```

## Setup for production

First we have to add a new webpack config add a file  `webpack.config.prod.js` and write

```javascript
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin'); // add new plugin to clean app our webpack 'dist' folder so always we have latest configuration.

module.exports = {
  mode: 'production',
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
    // Delete public path because we don't need it anymore
  },
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CleanPlugin.CleanWebpackPlugin() // CleanWebpackPlugin to clean our dist.
  ]
};
```

add into `package.json`

```json
{
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server",
    "build": "webpack --config webpack.config.prod.js"
  }
}
```