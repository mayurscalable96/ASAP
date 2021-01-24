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
import ViewShot from 'react-native-view-shot';

const FeedbackReflection = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    selectedPracticeFeedbackReports,
    selectedPractice,
    practiceFeedback,
    selectedPracticeType,
  } = useSelector((state) => state.practices);
  const user = useSelector((state) => state.user);
  const [yourReflection, setYourReflection] = useState();

  useEffect(() => {
    if (selectedPracticeFeedbackReports) {
      setYourReflection(selectedPracticeFeedbackReports.reflection);
    }
  }, [selectedPracticeFeedbackReports]);

  const onPressSubmit = () => {
    if (!yourReflection) {
      dispatch(AppAction.showToast({message: Languages.pleaseAddReflection}));
    } else {
      var paramData = {
        practice_feedback_id: selectedPracticeFeedbackReports.id,
        reflection: yourReflection,
      };
      dispatch(PracticesActions.practiceFeedbackReflection(paramData));
    }
  };

  const onPressAddNewFeedback = () => {
    var selectedPracticeData = {
      id: selectedPracticeFeedbackReports.practice_id,
      color_code: selectedPracticeFeedbackReports.color_code,
      created_at: selectedPracticeFeedbackReports.created_at,
      updated_at: selectedPracticeFeedbackReports.updated_at,
      name: selectedPracticeFeedbackReports.name,
    };
    dispatch(PracticesActions.setSelectedPractice(selectedPracticeData));
    dispatch(
      PracticesActions.setPracticeFeedback(selectedPracticeFeedbackReports),
    );
    navigation.navigate('FeedbackForm');
  };

  const onPressDownloadPDF = () => {
    var selectedPracticeData = {
      id: selectedPracticeFeedbackReports.id,
    };
    dispatch(
      PracticesActions.downloadPracticeFeedbackReport(selectedPracticeData),
    );
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

  const onCapture = (uri) => {
    console.log('do something with ', uri);
  };
  return (
    <Container
      style={[
        styles.container,
        {
          backgroundColor:
            selectedPracticeFeedbackReports &&
            selectedPracticeFeedbackReports.color_code,
        },
      ]}>
      <Content contentContainerStyle={styles.contentStyle}>
        <ViewShot onCapture={onCapture} captureMode="mount">
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
                {selectedPracticeFeedbackReports &&
                  selectedPracticeFeedbackReports.name}
              </RegularText>
            </View>
            {selectedPracticeFeedbackReports &&
              selectedPracticeFeedbackReports.details && (
                <View>
                  <RegularText textStyle={styles.boldTextStyle}>
                    {Languages.feedbackCompleted}
                  </RegularText>
                  <FlatList
                    horizontal={true}
                    data={
                      selectedPracticeFeedbackReports &&
                      selectedPracticeFeedbackReports.details
                    }
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                  />
                </View>
              )}
          </Card>
          <Card borderRadius={10} style={styles.cardStyle}>
            <RegularText textStyle={styles.feeddbackFormText}>
              {Languages.addReflection}
            </RegularText>
            <TextArea
              placeholder={Languages.enterYourReflection}
              rowSpan={5}
              onChangeText={(text) => setYourReflection(text)}
              value={yourReflection}
            />
            <SolidButton
              buttonStyle={styles.submitButtonStyle}
              title={Languages.submit}
              onPress={() => onPressSubmit()}
            />
          </Card>
          <Card borderRadius={10} style={styles.cardStyle}>
            <View>
              <RegularText textStyle={styles.feeddbackFormText}>
                {Languages.feedbacks}
              </RegularText>
              <FlatList
                // horizontal={true}
                data={
                  selectedPracticeFeedbackReports &&
                  selectedPracticeFeedbackReports.details
                }
                renderItem={renderItemFeedbacks}
                keyExtractor={(item) => item.id}
              />
            </View>
            <SolidButton
              buttonStyle={styles.submitButtonStyle}
              title={Languages.addNewFeedBack}
              onPress={() => onPressAddNewFeedback()}
            />

            <SolidButton
              buttonStyle={styles.submitButtonStyle}
              title={'Download PDF'}
              onPress={() => onPressDownloadPDF()}
            />
          </Card>

          <Card borderRadius={10} style={styles.cardStyle}>
            <RegularText textStyle={styles.feeddbackFormText}>
              {Languages.yourReflection}
            </RegularText>
            <RegularText textStyle={styles.feedbackListNormalText}>
              {yourReflection}
            </RegularText>
          </Card>
        </ViewShot>
      </Content>
    </Container>
  );
};
export default FeedbackReflection;
