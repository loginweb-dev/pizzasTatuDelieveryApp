import React, { Component } from 'react';
import Delivery from './src/components/Delivery';
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {

  render() {
      console.disableYellowBox = true;
      return (
          <Provider store={store}>
            <Delivery />
          </Provider>
      );
  }
}


export default App;