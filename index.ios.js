/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Posts from './app/posts'

export default class tumblr extends Component {
  render() {
    return (
      <Posts />
    );
  }
}

AppRegistry.registerComponent('tumblr', () => tumblr);
