import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Image} from 'react-native';
import {Colors, Fonts} from '@common';
import {RegularText} from '@Typography';
import {Button} from 'native-base';

const SolidButton = (props) => (
  <Button
    disabled={props.disabled}
    block
    style={[
      styles.buttonStyle,
      props.buttonStyle,
      {backgroundColor: props.disabled ? Colors.lightGray : Colors.blue},
    ]}
    onPress={props.onPress}>
    {props.image && <Image source={props.image} style={styles.logo} />}
    <RegularText textStyle={[props.textStyle, styles.textStyle]}>
      {props.title}
    </RegularText>
  </Button>
);

SolidButton.propTypes = {
  title: PropTypes.string.isRequired,
  showIcon: PropTypes.bool,
};
SolidButton.defaultProps = {
  title: 'Button',
  showIcon: false,
};

export default SolidButton;

const styles = StyleSheet.create({
  buttonStyle: {
    marginVertical: 5,
    height: 45,
    // marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderRadius: 10,
  },
  logo: {width: 20, height: 20, marginLeft: -40, marginRight: 10},
  textStyle: {
    color: Colors.white,
    fontFamily: Fonts.type.bold,
  },
});
