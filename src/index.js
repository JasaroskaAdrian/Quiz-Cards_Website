const { app } = require("./app");
const { initModel } = require("./model");
const { update } = require("./update");
const { view } = require("./view");

const rootNode = document.getElementById("app");
app(initModel, update, view, rootNode);
