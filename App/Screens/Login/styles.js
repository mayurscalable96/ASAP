import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';
export default StyleSheet.create({
  container: {
    backgroundColor: Colors.blue,
  },
  contentStyle: {
    padding: 20,
  },
  headingTextStyle: {
    fontFamily: Fonts.type.bold,
    marginBottom: 10,
  },
  cardStyle: {
    borderRadius: 10,
    paddingVertical: 30,
  },
  cardItemStyle: {
    flexDirection: 'column',
  },
  forgotPasswordText: {
    color: Colors.blue,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: Fonts.type.bold,
  },
  registerText: {
    // textAlign: 'left',
  },
  newUser: {
    fontFamily: Fonts.type.bold,
  },
  registerView: {
    borderTopColor: Colors.lightGray,
    borderTopWidth: 0.3,
    marginTop: 20,
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  loginView: {
    paddingHorizontal: 30,
  },
  imageStyle: {
    width: 200,
    height: 200,
    tintColor: 'white',
  },
  imageViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
});
