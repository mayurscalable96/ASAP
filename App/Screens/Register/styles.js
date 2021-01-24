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
    flex: 1,
  },
  cardItemStyle: {
    flexDirection: 'column',
  },
  alreadyRegister: {
    fontFamily: Fonts.type.bold,
  },
  loginView: {
    borderTopColor: Colors.lightGray,
    borderTopWidth: 0.3,
    marginTop: 20,
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  registerView: {
    paddingHorizontal: 30,
  },
});
