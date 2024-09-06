const createElement = require("virtual-dom/create-element");
const diff = require("virtual-dom/diff");
const patch = require("virtual-dom/patch");

function app(initModel, update, view, node) {
    let model = initModel;
    let currentView = view(dispatch, model);
    let rootNode = createElement(currentView);
    node.appendChild(rootNode);
  
    function dispatch(msg, value) {
      model = update(msg, model, value);
      const updatedView = view(dispatch, model);
      const patches = diff(currentView, updatedView);
      rootNode = patch(rootNode, patches);
      currentView = updatedView;
    }
}

module.exports = { app }