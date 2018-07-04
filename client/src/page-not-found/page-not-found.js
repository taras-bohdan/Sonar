import React, { Component } from 'react';

export class PageNotFound extends Component {
  constructor({ location }) {
    super();
    this.state = { path: location.pathname };
  }

  render() {
    return (
      <div>
        404 - page not found: {this.state.path}
      </div>
    );
  }
}
