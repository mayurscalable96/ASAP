import React, {useEffect} from 'react';
import {navigationRef, isMountedRef} from '../../Utils/rNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {Icon} from 'react-native-elements';
import {GlobalStyles, Colors, Images, Fonts} from '@common';
import {Image, StyleSheet, View, Platform, Share} from 'react-native';
import HeaderRight from '../../Components/HeaderRight';
import HeaderLeft from '../../Components/HeaderLeft';

// Auth Flow
import Splash from '../Splash';
import Login from '../Login';
import Registration from '../Register';
import UserProfile from '../UserProfile';
import ChangePassword from '../ChangePassword';
import ForgotPassword from '../ForgotPassword';

//FeedbackEntry
import FeedbackEntry from '../FeedbackEntry';
import FeedbackForm from '../FeedbackForm';
import CreatePractice from '../CreatePractice';
import FeedbackThankyou from '../FeedbackThankyou';

// Main Tab
import FeedbackReports from '../FeedbackReports';
import FeedbackReflection from '../FeedbackReflection';
//Other

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const headerOption = {
  headerStyle: {
    // backgroundColor: Colors.white,
    shadowRadius: 0,
    elevation: 0,
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
    },
  },
  headerTitleStyle: {
    color: Colors.black,
    fontSize: 22,
    fontFamily: Fonts.type.bold,
    alignSelf: 'center',
  },
  headerTintColor: Colors.black,
};

const feedbackEntry = () => (
  <Stack.Navigator screenOptions={headerOption}>
    <Stack.Screen name="FeedbackEntry" component={FeedbackEntry} />
  </Stack.Navigator>
);
const feedbackReport = () => (
  <Stack.Navigator screenOptions={headerOption}>
    <Stack.Screen name="FeedbackReports" component={FeedbackReports} />
  </Stack.Navigator>
);

const createMainStack = () => (
  <Stack.Navigator screenOptions={headerOption}>
    <Stack.Screen
      name="Splash"
      component={Splash}
      options={({navigation, route}) => ({
        headerShown: false,
      })}
    />

    <Stack.Screen
      name="Login"
      component={Login}
      options={({navigation, route}) => ({
        headerShown: false,
      })}
    />
    <Stack.Screen
      name="Registration"
      component={Registration}
      options={({navigation, route}) => ({
        headerShown: false,
      })}
    />
    <Stack.Screen
      name="MainTab"
      children={createMainTab}
      options={({navigation, route}) => ({
        headerShown: true,
        title: 'Home',
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerRight: () => (
          <HeaderRight onPressLogout={() => navigation.navigate('Login')} />
        ),
      })}
    />
    <Stack.Screen
      name="FeedbackForm"
      component={FeedbackForm}
      options={({navigation, route}) => ({
        headerShown: true,
        title: 'Feedback Form',
        headerLeft: () => (
          <HeaderLeft
            backButton={true}
            navigation={navigation}
            navigationScreen={'MainTab'}
          />
        ),
        headerRight: () => (
          <HeaderRight onPressLogout={() => navigation.navigate('Login')} />
        ),
      })}
    />
    <Stack.Screen
      name="CreatePractice"
      component={CreatePractice}
      options={({navigation, route}) => ({
        headerShown: true,
        title: 'Create Practice',
        headerLeft: () => (
          <HeaderLeft backButton={true} navigation={navigation} />
        ),
        headerRight: () => (
          <HeaderRight onPressLogout={() => navigation.navigate('Login')} />
        ),
      })}
    />
    <Stack.Screen
      name="UserProfile"
      component={UserProfile}
      options={({navigation, route}) => ({
        headerShown: true,
        title: 'User Profile',
        headerLeft: () => (
          <HeaderLeft backButton={true} navigation={navigation} />
        ),
        headerRight: () => (
          <HeaderRight onPressLogout={() => navigation.navigate('Login')} />
        ),
      })}
    />
    <Stack.Screen
      name="FeedbackThankyou"
      component={FeedbackThankyou}
      options={({navigation, route}) => ({
        headerShown: true,
        title: '',
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerRight: () => (
          <HeaderRight onPressLogout={() => navigation.navigate('Login')} />
        ),
      })}
    />

    <Stack.Screen
      name="ChangePassword"
      component={ChangePassword}
      options={({navigation, route}) => ({
        headerShown: true,
        title: 'ChangePassword',
        headerLeft: () => (
          <HeaderLeft backButton={true} navigation={navigation} />
        ),
        headerRight: () => (
          <HeaderRight onPressLogout={() => navigation.navigate('Login')} />
        ),
      })}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPassword}
      options={({navigation, route}) => ({
        headerShown: true,
        title: 'Forgot Password',
        headerLeft: () => (
          <HeaderLeft backButton={true} navigation={navigation} />
        ),
        // headerRight: () => (
        //   <HeaderRight onPressLogout={() => navigation.navigate('Login')} />
        // ),
      })}
    />

    <Stack.Screen
      name="FeedbackReflection"
      component={FeedbackReflection}
      options={({navigation, route}) => ({
        headerShown: true,
        title: 'Feedback Reflection',
        headerLeft: () => (
          <HeaderLeft backButton={true} navigation={navigation} />
        ),
        headerRight: () => (
          <HeaderRight onPressLogout={() => navigation.navigate('Login')} />
        ),
      })}
    />
  </Stack.Navigator>
);

const createMainTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.white,
        inactiveTintColor: Colors.blue,
        activeBackgroundColor: 'red',
        labelStyle: styles.labelStyle,
        tabStyle: {
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderWidth: 1,
          // marginLeft: 5,
          // marginHorizontal: 15,
          borderColor: Colors.lightGray,
        },
        style: {
          paddingTop: 10,
          paddingHorizontal: 2,
          backgroundColor: Colors.white,
        },
        indicatorStyle: {
          height: null,
          top: 10,
          backgroundColor: Colors.blue,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderWidth: 1,
          borderColor: 'transparent',
        },
      }}>
      <Tab.Screen name="Feedback Entry" component={feedbackEntry} />
      <Tab.Screen name="Feedback Reports" component={feedbackReport} />
    </Tab.Navigator>
  );
};

export default () => {
  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      {createMainStack()}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.bold,
    textTransform: 'none', // or capitalize
  },
});
