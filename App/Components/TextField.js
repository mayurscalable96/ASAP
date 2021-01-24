import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet} from 'react-native';
import {Item, Input} from 'native-base';
import {Icon} from 'react-native-elements';
import {GlobalStyles, Fonts, Colors} from '@common';

class TextField extends Component {
  render() {
    const {
      placeHolder,
      rightIcon,
      inputAccessoryViewID,
      onChangeText,
      autoCorrect,
      autoCapitalize,
      showRightButton,
      onPressRightIcon,
      value,
      innerPlaceHolder,
      keyboardType,
      multiline,
      textInputStyle,
      containerStyle,
      editable,
      error,
      secureTextEntry,
      ref,
      onSubmitEditing,
    } = this.props;
    return (
      <>
        <Item style={styles.itemStyle}>
          <Input
            ref={ref}
            placeholder={placeHolder}
            editable={editable}
            placeholderTextColor={Colors.lightGray}
            value={value}
            style={[styles.textInput, textInputStyle]}
            autoCorrect={autoCorrect}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            multiline={multiline}
            secureTextEntry={secureTextEntry}
            onSubmitEditing={onSubmitEditing}
          />
          {showRightButton && (
            <Icon
              name={rightIcon}
              type={GlobalStyles.Constants.iconType.materialCom}
              onPress={onPressRightIcon}
            />
          )}
        </Item>
        <Text style={styles.errorStyle}>{error}</Text>
      </>
    );
  }
}

TextField.propTypes = {
  placeHolder: PropTypes.string,
  image: PropTypes.number,
  onChangeText: PropTypes.func,
  onPressRightIcon: PropTypes.func,
  showRightButton: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
};
TextField.defaultProps = {
  placeHolder: null,
  image: null,
  showRightButton: false,
  secureTextEntry: false,
};
export default TextField;

const styles = StyleSheet.create({
  textInput: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular,
    paddingLeft: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.lightGray,
  },
  itemStyle: {
    borderColor: 'transparent',
  },
  errorStyle: {
    // paddingHorizontal: 20,
    paddingTop: 3,
    color: 'red',
    fontSize: 12,
  },
});
