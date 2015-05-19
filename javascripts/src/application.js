var component = require('./components/component');
component();

var reactComponent = require('./components/component.react.jsx');

var React = require('react');

window.onload = function () {
	React.render(React.createElement(reactComponent), document.body);
};