import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Image, Text, View, FlatList} from 'react-native';
import {Container, Content} from 'native-base';
import styles from './styles';
import {Languages} from '@common';
import {SolidButton} from '@Buttons';
import {XLText, LargeText, RegularText} from '@Typography';
import {Card, CardItem} from 'native-base';
import TextField from '../../Components/TextField';
import CustomPicker from '../../Components/CustomPicker';
import TextArea from '../../Components/TextArea';
import {Icon} from 'react-native-elements';
import {Constants, Fonts, Images, GlobalStyles, Colors} from '@common';
import PracticesActions from '../../Redux/Practices/reducer';

const FeedbackThankyou = ({navigation}) => {
  const {selectedPractice, practiceFeedback, feedbackByUser} = useSelector(
    (state) => state.practices,
  );
  useEffect(() => {
    console.log('navigation', feedbackByUser);
  });
  const dispatch = useDispatch();
  const onPressOkay = () => {
    navigation.goBack();
  };
  return (
    <Container style={styles.container}>
      <Icon
        name="smile"
        type="font-awesome-5"
        color={selectedPractice.color_code}
        size={150}
        // containerStyle={{backgroundColor:'red'}}
      />
      <XLText
        textStyle={[styles.thankyouText, {color: selectedPractice.color_code}]}>
        {`Thank you ${feedbackByUser.name} for your feedback`}
      </XLText>

      <SolidButton
        buttonStyle={styles.buttonStyle}
        title={Languages.okay}
        onPress={() => onPressOkay()}
      />
    </Container>
  );
};
export default FeedbackThankyou;
