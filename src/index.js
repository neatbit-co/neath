"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const index_html_1 = require("./public/index.html");
const app = express();
app.use("/", (req, res) => {
    res.send(index_html_1.default);
});
app.listen(3000, function () {
    console.log("Powered by FuseBox");
    console.log('Example app listening on port 3000!');
});
