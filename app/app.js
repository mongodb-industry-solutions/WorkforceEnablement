/**
 * app.js
 */
import '@babel/polyfill';
import App from 'containers/App';
import React from 'react';
import { LogBox, YellowBox } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from 'app/store';

LogBox.ignoreAllLogs(true);
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'RNDeviceInfo',
  'Warning: An update',
  'RCTView',
  'View',
  'http',
]);

const render = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default render;
