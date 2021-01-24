import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Header, ListItem, Left, Button, Body, Right} from 'native-base';
import {Constants, Fonts, Images, GlobalStyles, Colors} from '@common';
import {LargeText, SmallText, RegularText} from '@Typography';
import {Icon} from 'react-native-elements';
const CustomPicker = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {pickerText, pickerPlaceholder, iconColorCode} = props;
  return (
    <View style={styles.mainView}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.textViewStyle}>
          <RegularText
            textStyle={[
              pickerText ? styles.pickerText : styles.pickerPlaceholder,
              props.textStyle,
            ]}
            numberOfLines={2}>
            {pickerText ? pickerText : pickerPlaceholder}
          </RegularText>
          {iconColorCode && (
            <Icon
              // name={feedbackValue.reflection ? 'check-circle' : 'circle'}
              name={'circle'}
              type={GlobalStyles.Constants.iconType.material}
              color={iconColorCode}
              size={20}
            />
          )}

          <Icon
            name="arrow-drop-down"
            type={GlobalStyles.Constants.iconType.material}
            color={Colors.lightGray}
            size={25}
            containerStyle={[styles.arrow, props.arrowImageStyle]}
          />
          {/* <View style={styles.bottomBorder}></View> */}
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
        }}>
        <Header style={{backgroundColor: 'white'}}>
          <Left>
            <Button
              style={{justifyContent: 'flex-start'}}
              transparent
              onPress={() => setModalVisible(false)}>
              <Icon
                name="arrow-back"
                type={GlobalStyles.Constants.iconType.material}
                color={Colors.black}
                size={30}
              />
            </Button>
          </Left>
          <Body />
          <Right />
        </Header>
        <FlatList
          data={props.dataSource}
          renderItem={({item, index}) => (
            <ListItem
              onPress={() => {
                props.onPress(item, index);
                setModalVisible(false);
              }}>
              <RegularText>{item.name}</RegularText>
              <Icon
                // name={feedbackValue.reflection ? 'check-circle' : 'circle'}
                name={'circle'}
                type={GlobalStyles.Constants.iconType.material}
                color={item.color_code}
                size={20}
              />
            </ListItem>
          )}
          keyExtractor={(item) => item.id}
        />
      </Modal>
    </View>
  );
};

export default CustomPicker;

const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: 2,
  },
  textViewStyle: {
    flexDirection: 'row',
    paddingLeft: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.lightGray,
    alignItems: 'center',
    marginBottom: 20,
    height: 50,
    paddingHorizontal: 2,
  },
  headerText: {
    position: 'absolute',
    top: 5,
    fontSize: 18,
    color: 'white',
  },
  backgroundContainer: {
    flex: 1,
  },
  image: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    position: 'absolute',
    width: 20,
    height: 20,
    right: 10,
  },
  pickerText: {
    textAlign: 'left',
  },
  pickerPlaceholder: {
    textAlign: 'left',
    color: Colors.lightGray,
  },
  backArrow: {
    width: 20,
    height: 20,
    tintColor: 'black',
  },
  bottomBorder: {
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    marginTop: 10,
  },
});
