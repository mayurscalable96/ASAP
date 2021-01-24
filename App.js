import React from 'react';
import {Provider} from 'react-redux';
import {YellowBox} from 'react-native';
import Root from './App/Screens/Root';
import createStore from './App/Stores/reducer';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

export default () => {
  const {store} = createStore();
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};
