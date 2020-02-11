import React, { Component } from 'react';
import {
  AsyncStorage
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';

import SplashScreen from '../ui/SplashScreen/SplashScreen';
import Login from '../screens/Login/Login';
import DeliveryOrders from '../screens/DeliveryOrders/DeliveryOrders';
import SideBar from '../components/Sidebar/Sidebar';
import ItemDetail from '../screens/ItemDetail/ItemDetail';
import Profile from '../screens/Profile/Profile';

class AuthLoading extends Component {
  constructor(props) {
      super(props);
      this.bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      setTimeout(()=>{ this.props.navigation.navigate(isLoggedIn == '1' ? 'App' : 'Login'); }, 2500);
  };

  // Render any loading content that you like here
  render() {
      console.disableYellowBox = true;
      return (
          <SplashScreen/>
      );
  }
}

const Drawer = createDrawerNavigator(
  {
    DeliveryOrders: { screen: DeliveryOrders }
  },
  {
      initialRouteName: 'DeliveryOrders',
      contentComponent: SideBar
  }
)

const AppNavigator = createStackNavigator({
    Drawer,
    Profile: { screen: Profile },
    ItemDetail,
  },
  {
      headerMode: 'none'
  }
);

const AuthNavigator = createStackNavigator({
    Login,
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);

const MainNavigator =  createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: AppNavigator,
    Auth: AuthNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default MainNavigator;