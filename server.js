const webpack = require("webpack")
const express = require("express")
const path = require('path');
const serveStatic = require("serve-static")
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")
const config = require("./webpack.config")

const app = express()
const port = 3000
const compiler = webpack(config)

app.use("/public", express.static(path.join(__dirname, "/public")))
app.use("/node_modules", express.static(path.join(__dirname, "/node_modules")))
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})