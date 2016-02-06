var React = require('react');

var ChainedComponentMixin = {
  renderChild: function() {
    function createChainedFunction() {
      var args = arguments;

      return function chainedFunction() {
        for (var i = 0; i < args.length; i++) {
          if (args[i] && args[i].apply) {
            args[i].apply(this, arguments);
          }
        }
      };
    }

    var child = React.Children.only(this.props.children);
    var props = {};

    props.onClick = createChainedFunction(child.props.onClick, this.props.onClick);
    props.onMouseOver = createChainedFunction(child.props.onMouseOver, this.props.onMouseOver);
    props.onMouseOut = createChainedFunction(child.props.onMouseOut, this.props.onMouseOut);
    props.onFocus = createChainedFunction(child.props.onFocus, this.props.onFocus);
    props.onBlur = createChainedFunction(child.props.onBlur, this.props.onBlur);

    return React.cloneElement(child, props);
  }
};

module.exports = ChainedComponentMixin;
