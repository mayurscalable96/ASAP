import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Share} from 'react-native';
import {GlobalStyles, Colors} from '@common';
import {Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import UserAction from '../Redux/User/reducer';
const HeaderRight = (props) => {
  var dispatch = useDispatch();
  const onPressLogout = () => {
    dispatch(UserAction.logout());
  };
  return (
    <View style={styles.headerRightView}>
      <Icon
        name="logout"
        type={GlobalStyles.Constants.iconType.materialCom}
        color={Colors.black}
        size={25}
        onPress={onPressLogout}
        containerStyle={styles.share}
      />
    </View>
  );
};
export default HeaderRight;

const styles = StyleSheet.create({
  headerRightView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  share: {
    paddingHorizontal: 10,
  },
});
