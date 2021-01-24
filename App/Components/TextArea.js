import React from 'react';
import {StyleSheet} from 'react-native';
import {Textarea, Item} from 'native-base';
import {GlobalStyles, Fonts, Colors} from '@common';

const TextArea = (props) => {
  return (
    <>
      <Item style={styles.itemStyle}>
        <Textarea
          rowSpan={props.rowSpan}
          bordered={props.bordered}
          value={props.value}
          placeholder={props.placeholder}
          placeholderTextColor={Colors.lightGray}
          style={[props.textAreaStyle, styles.textArea]}
          maxLength={props.maxLength}
          onChangeText={props.onChangeText}
        />
      </Item>
    </>
  );
};
export default TextArea;
const styles = StyleSheet.create({
  textArea: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.regular,
    paddingLeft: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.lightGray,
    width: '100%',
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
