const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "service-worker.js",
    path: path.resolve(__dirname, "../", "dist"),
  },
}
