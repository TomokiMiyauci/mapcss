const contentSnapshot = require("./store");

module.exports = function (content) {
  contentSnapshot.set(this._module, content);
  return content;
};
