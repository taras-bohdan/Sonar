import React, { Component } from 'react';

/**
 * Page not found component
 */
export class PageNotFound extends Component {
  /**
   * Component's constructor
   * @param {object} location - previous location
   */
  constructor({ location }) {
    super();
    this.state = { path: location.pathname };
  }

  /**
   * Render the component
   * @return {*} - component's HTML
   */
  render() {
    return (
      <div>
        404 - page not found: {this.state.path}
      </div>
    );
  }
}
