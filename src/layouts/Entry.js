import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import dynamic from 'umi/dynamic';
import { async } from 'q';
import BasicLayout from './BasicLayout';

export default class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    //   logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return <BasicLayout> {this.props.children} </BasicLayout>;
  }
}
