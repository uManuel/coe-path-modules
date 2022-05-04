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

## We have to configure our webpack

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

And run npm run build.