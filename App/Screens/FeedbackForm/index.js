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
import AppAction from '../../Redux/Root/reducer';
import PracticesActions from '../../Redux/Practices/reducer';
import moment from 'moment';

const FeedbackForm = ({navigation}) => {
  const dispatch = useDispatch();
  const {selectedPractice, practiceFeedback} = useSelector(
    (state) => state.practices,
  );
  const user = useSelector((state) => state.user);
  const [yourName, setYourName] = useState();
  const [yourFeedback, setYourFeedback] = useState();

  useEffect(() => {
    // console.log('user', user);
  });

  const onPressSubmit = () => {
    if (!yourName) {
      dispatch(AppAction.showToast({message: Languages.pleaseEnterYourName}));
    } else if (!yourFeedback) {
      dispatch(
        AppAction.showToast({message: Languages.pleaseEnterYourFeedback}),
      );
    } else {
      var paramData = '';
      if (practiceFeedback) {
        paramData = {
          practice_id: selectedPractice.id,
          name: yourName,
          description: yourFeedback,
          practice_feedback_id: practiceFeedback.id,
        };
      } else {
        paramData = {
          practice_id: selectedPractice.id,
          name: yourName,
          description: yourFeedback,
        };
      }

      dispatch(PracticesActions.practiceFeedback(paramData));
      setYourName();
      setYourFeedback();
    }
  };

  const renderItem = ({item}) => {
    return (
      <Icon
        name="check-circle"
        type={GlobalStyles.Constants.iconType.material}
        color={Colors.blue}
        size={25}
      />
    );
  };

  const renderItemFeedbacks = ({item}) => {
    return (
      <View style={styles.feedbackDetail}>
        <View style={styles.feedbackListTextView}>
          <RegularText textStyle={styles.boldTextStyle}>
            {Languages.name}
          </RegularText>
          <RegularText textStyle={styles.feedbackListNormalText}>
            {item.name}
          </RegularText>
        </View>
        <View style={styles.feedbackListTextView}>
          <RegularText textStyle={styles.boldTextStyle}>
            {Languages.description}
          </RegularText>
          <RegularText textStyle={styles.feedbackListNormalText}>
            {item.description}
          </RegularText>
        </View>
        {/* <View style={styles.feedbackListTextView}>
          <RegularText textStyle={styles.boldTextStyle}>
            {Languages.date}
          </RegularText>
          <RegularText textStyle={styles.feedbackListNormalText}>
            {moment(item.created_at).format('dddd DD MMM yyy hh:mm')}
          </RegularText>
        </View> */}
      </View>
    );
  };
  return (
    <Container
      style={[
        styles.container,
        {backgroundColor: selectedPractice && selectedPractice.color_code},
      ]}>
      <Content contentContainerStyle={styles.contentStyle}>
        <Card borderRadius={10} style={styles.cardStyle}>
          <View style={styles.textViewStyle}>
            <RegularText textStyle={styles.boldTextStyle}>
              {Languages.name}
            </RegularText>
            {user.user && (
              <RegularText textStyle={styles.normalText}>
                {user.user.name}
              </RegularText>
            )}
          </View>
          <View style={styles.textViewStyle}>
            <RegularText textStyle={styles.boldTextStyle}>
              {Languages.practice}
            </RegularText>
            <RegularText textStyle={styles.normalText}>
              {selectedPractice && selectedPractice.name}
            </RegularText>
          </View>
          {practiceFeedback && (
            <View>
              <RegularText textStyle={styles.boldTextStyle}>
                {Languages.feedbackCompleted}
              </RegularText>
              <FlatList
                horizontal={true}
                data={practiceFeedback.details}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </View>
          )}
        </Card>
        <Card borderRadius={10} style={styles.cardStyle}>
          <RegularText textStyle={styles.feeddbackFormText}>
            {Languages.feedbackForm}
          </RegularText>
          <TextField
            placeHolder={Languages.enterYourName}
            onChangeText={(text) => setYourName(text)}
            value={yourName}
          />
          <TextArea
            placeholder={Languages.enterYourValuableFeedback}
            rowSpan={5}
            onChangeText={(text) => setYourFeedback(text)}
            value={yourFeedback}
          />
          <SolidButton
            buttonStyle={styles.submitButtonStyle}
            title={Languages.submit}
            onPress={() => onPressSubmit()}
          />
        </Card>
        {practiceFeedback && (
          <Card borderRadius={10} style={styles.cardStyle}>
            <View>
              <RegularText textStyle={styles.feeddbackFormText}>
                {Languages.feedbacks}
              </RegularText>
              <FlatList
                // horizontal={true}
                data={practiceFeedback.details}
                renderItem={renderItemFeedbacks}
                keyExtractor={(item) => item.id}
              />
            </View>
          </Card>
        )}
      </Content>
    </Container>
  );
};
export default FeedbackForm;
