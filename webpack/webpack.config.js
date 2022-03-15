const MapcssWebpackPlugin = require("./mod");

/** @type import('webpack').Configuration */
const config = {
  mode: "development",
  plugins: [new MapcssWebpackPlugin()],
};

module.exports = config;
