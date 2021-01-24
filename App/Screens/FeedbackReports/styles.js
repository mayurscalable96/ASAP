import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '@common';
export default StyleSheet.create({
  container: {
    padding: 20,
  },
  headingText: {
    fontFamily: Fonts.type.bold,
    // textAlign: 'left',
  },
  dateText: {
    textAlign: 'left',
  },
  flatListHeading: {
    marginTop: 10,
  },
  iconView: {
    flexDirection: 'row',
  },

  sectionHeader: {
    fontWeight: '800',
    fontSize: 18,
    color: 'red',
    marginTop: 20,
    marginBottom: 5,
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  itemText: {
    color: 'red',
    marginTop: 5,
  },
  buttonStyle: {
    flex: 0.5,
    marginLeft: 20,
  },
  filterView: {
    flexDirection: 'row',
  },
});
