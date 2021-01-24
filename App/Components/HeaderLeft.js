import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {GlobalStyles, Colors, Fonts} from '@common';
import {Thumbnail} from 'native-base';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {XLText, LargeText, RegularText, MediumText} from '@Typography';

const HeaderLeft = (props) => {
  const user = useSelector((state) => state.user);

  return (
    <View style={styles.headerLeftView}>
      {props.backButton ? (
        <Icon
          name="arrow-back-outline"
          type={GlobalStyles.Constants.iconType.ionIcons}
          color={Colors.black}
          size={30}
          onPress={() =>
            props.navigationScreen
              ? props.navigation.navigate(props.navigationScreen)
              : props.navigation.goBack()
          }
        />
      ) : (
        <View>
          {user && user.user ? (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('UserProfile')}>
              <RegularText
                numberOfLines={user.user.name.length < 15 ? 1 : 2}
                // ellipsizeMode="middle"
                textStyle={[
                  styles.textStyle,
                  {width: user.user.name.length < 15 ? '100%' : '52%'},
                ]}>
                {user.user.name}
              </RegularText>
            </TouchableOpacity>
          ) : null}
        </View>
      )}
    </View>
  );
};
export default HeaderLeft;

const styles = StyleSheet.create({
  headerLeftView: {
    paddingLeft: 10,
  },
  textStyle: {
    fontFamily: Fonts.type.bold,
    color: Colors.blue,
    textAlign: 'left',
    // height: 40,
  },
});
