import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';
export default StyleSheet.create({
  container: {
    // backgroundColor: Colors.blue,
    padding: 20,
  },
  cardStyle: {
    borderRadius: 10,
    padding: 30,
  },
  buttonStyle: {
    marginTop: 50,
    marginHorizontal: 30,
  },
  iconContainerStyle: {
    padding: 10,
  },
  flatListViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorTagText: {
    fontFamily: Fonts.type.bold,
  },
  practiceListText: {
    // textAlign: 'left',
    marginTop: 5,
  },
  practiceListView: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 0.5,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  practiceListTouchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
