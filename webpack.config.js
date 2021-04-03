const path = require('path');

module.exports = {
  entry: './public/scripts/board.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/scripts'),
  },
};
