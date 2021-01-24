import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Image, Text, View} from 'react-native';
import {Container, Content} from 'native-base';
import styles from './styles';
import {Languages} from '@common';
import {SolidButton} from '@Buttons';
import {XLText, LargeText, RegularText} from '@Typography';
import {Card, CardItem} from 'native-base';
import TextField from '../../Components/TextField';
import CustomPicker from '../../Components/CustomPicker';
import PracticesActions from '../../Redux/Practices/reducer';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppAction from '../../Redux/Root/reducer';

const FeedbackEntry = ({navigation}) => {
  const [selectedPracticeType, setSelectedPracticeType] = useState();
  const dispatch = useDispatch();
  const {listPractice, practiceFeedback} = useSelector(
    (state) => state.practices,
  );

  useEffect(() => {
    dispatch(PracticesActions.getListPractices());
  }, [dispatch]);

  useEffect(() => {
    setSelectedPracticeType();
  }, [listPractice]);
  const onPressNext = () => {
    if (!selectedPracticeType) {
      dispatch(
        AppAction.showToast({message: Languages.pleaseSelectPracticeType}),
      );
    } else {
      dispatch(PracticesActions.setSelectedPractice(selectedPracticeType));
      navigation.navigate('FeedbackForm');
      dispatch(PracticesActions.setPracticeFeedback(null));
    }
  };
  const onPressCreateNewPratice = () => {
    navigation.navigate('CreatePractice');
  };

  const onPressCustomPicker = (item) => {
    setSelectedPracticeType(item);
  };

  return (
    <Container
      style={[
        styles.container,
        // {
        //   backgroundColor:
        //     selectedPracticeType && selectedPracticeType.color_code
        //       ? selectedPracticeType.color_code
        //       : Colors.white,
        // },
      ]}>
      <Content contentContainerStyle={styles.contentStyle}>
        {listPractice && listPractice.length > 0 && (
          <Card borderRadius={10} style={styles.cardStyle}>
            <CustomPicker
              dataSource={listPractice}
              pickerText={selectedPracticeType && selectedPracticeType.name}
              pickerPlaceholder={Languages.selectPracticeType}
              onPress={(item, index) => onPressCustomPicker(item)}
              iconColorCode={
                selectedPracticeType && selectedPracticeType.color_code
              }
            />
            <SolidButton title={Languages.next} onPress={() => onPressNext()} />
          </Card>
        )}
        <SolidButton
          title={Languages.createNewPractice}
          onPress={() => onPressCreateNewPratice()}
          buttonStyle={styles.buttonStyle}
        />
      </Content>
    </Container>
  );
};
export default FeedbackEntry;
