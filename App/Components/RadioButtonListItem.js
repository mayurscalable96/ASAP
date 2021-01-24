import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { Colors} from "@common";
import { CheckBox } from "react-native-elements";
import { RegularText } from "@Typographyy";

const RadioButtonListItem = (props) => (
  
  <View style={styles.container}>  
  <CheckBox
        containerStyle={styles.checkBoxContainer}
        iconType="material"
        checkedIcon={"check-circle"}
        uncheckedIcon="radio-button-unchecked"
        checkedColor={Colors.blue}
        checked={props.checked}
        onPress={() => props.onPress(props.index)}
      />
      <RegularText textStyle={styles.checkBoxText}>{props.title}</RegularText>
   </View>

);

RadioButtonListItem.propTypes = {
  checked: PropTypes.bool,
  index: PropTypes.number,
  title: PropTypes.string,
};

RadioButtonListItem.defaultProps = {
  checked: false,
  index: 0,
  title: "No title",
};

export default RadioButtonListItem;

const styles = StyleSheet.create({
  container:{
   flexDirection:'row',
   paddingVertical:3
  },
  checkBoxText: {
    // color: Colors.mediumGray,
    textAlign: "left",
  },
  checkBoxContainer: {
    padding: 0,
    margin: 0,
  },
  leftIcon: {
    marginRight: 0,
    marginVertical: 0,
  },
});
