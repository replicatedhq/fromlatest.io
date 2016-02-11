var React = require('react');
var Router = require('react-router');

var Route = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var Layout = require('components/Layout');
var Analyze = require('components/Analyze');
var About = require('components/About');
var OverlayAlert = require('components/OverlayAlert');

require('font-awesome-webpack');
require('styles/main.less');

var content = document.getElementById('content');

var NotFound = React.createClass({
  render: function () {
    return <h2>Not found</h2>;
  }
});

var Main = React.createClass({
  render: function () {
    return (
      <div>
        <Route/>
        <OverlayAlert />
      </div>
    );
  }
});

var Routes = (
  <Route path="/" handler={Main}>
    <Route name="main" path="/" handler={Layout}>
      <Route name="analyze" path="/" handler={Analyze} />
      <Route name="about" path="/about" handler={About} />
    </Route>
    <DefaultRoute handler={Layout} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
