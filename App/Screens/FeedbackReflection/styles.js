import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';
export default StyleSheet.create({
  container: {
    // backgroundColor: Colors.blue,
    paddingHorizontal: 20,
  },
  contentStyle: {
    paddingVertical: 20,
  },
  cardStyle: {
    borderRadius: 10,
    padding: 30,
  },
  buttonStyle: {
    marginTop: 50,
    marginHorizontal: 30,
  },
  boldTextStyle: {
    fontFamily: Fonts.type.bold,
    textAlign: 'left',
  },
  normalText: {
    marginLeft: 2,
  },
  textViewStyle: {
    flexDirection: 'row',
    width: '70%',
  },
  feeddbackFormText: {
    fontFamily: Fonts.type.bold,
    marginBottom: 20,
  },
  submitButtonStyle: {
    marginTop: 30,
  },
  feedbackDetail: {
    paddingVertical: 10,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 0.5,
  },
  feedbackListTextView: {
    // flexDirection: 'row',
  },
  feedbackListNormalText: {
    marginLeft: 2,
    textAlign: 'left',
  },
});
