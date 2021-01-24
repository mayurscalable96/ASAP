import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Image, Text, View, SectionList, FlatList} from 'react-native';
import {Container, Content} from 'native-base';
import styles from './styles';
import {Languages} from '@common';
import {SolidButton} from '@Buttons';
import {XLText, LargeText, RegularText} from '@Typography';
import {Card, CardItem} from 'native-base';
import TextField from '../../Components/TextField';
import {Icon} from 'react-native-elements';
import {Constants, Fonts, Images, GlobalStyles, Colors} from '@common';
import PracticesActions from '../../Redux/Practices/reducer';
import moment from 'moment';
import DatePickerModal from '../../Components/DatePickerModal';

const FeedbackReports = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState();
  const dispatch = useDispatch();
  const {practiceFeedbackReport} = useSelector((state) => state.practices);
  const [
    practiceFeedbackReportData,
    setPracticeFeedbackReportData,
  ] = useState();
  useEffect(() => {
    dispatch(PracticesActions.getPracticeFeedbackReport());
  }, [dispatch]);

  useEffect(() => {
    setPracticeFeedbackReportData(practiceFeedbackReport);
  }, [practiceFeedbackReport]);

  const onPressFeedbackGroup = (feedbackValue, color_code, name) => {
    var newData = {
      color_code: color_code,
      name: name,
      ...feedbackValue,
    };

    dispatch(PracticesActions.setSelectedPracticeFeedbackReports(newData));
    navigation.navigate('FeedbackReflection');
  };

  const renderItemHorizontal = (color_code, name, feedbackValue) => {
    return (
      <Icon
        name={feedbackValue.reflection ? 'check-circle' : 'circle'}
        // name={'circle'}
        type={GlobalStyles.Constants.iconType.material}
        color={color_code}
        size={25}
        onPress={() => onPressFeedbackGroup(feedbackValue, color_code, name)}
      />
    );
  };

  const renderItem = (key, value) => {
    var dataSet = [];
    value.feedback.forEach((check, index) => {
      // console.log('check', check);

      if (
        index !== 0 &&
        moment(check.created_at).format('dddd DD MMM yyy') ===
          moment(value.feedback[index - 1].created_at).format('dddd DD MMM yyy')
      ) {
        dataSet.forEach((dataSetItem, index) => {
          if (
            moment(dataSetItem.title).format('dddd DD MMM yyy') ===
            moment(check.created_at).format('dddd DD MMM yyy')
          ) {
            dataSet[index].data.push(check);
          }
        });
      } else {
        dataSet.push({
          title: check.created_at,
          color_code: value.color_code,
          data: [check],
          feedbackValue: check,
        });
      }
    });

    console.log('dataSet', dataSet);

    return (
      <View style={styles.flatListHeading}>
        {value.feedback.length > 0 ? (
          <View>
            <RegularText textStyle={styles.headingText}>
              {value.name}
            </RegularText>
            <SectionList
              sections={dataSet}
              renderItem={({item, section}) => {
                return <View>{/* <RegularText>list</RegularText> */}</View>;
              }}
              renderSectionHeader={(headerItem) => {
                return (
                  <>
                    <View>
                      <RegularText textStyle={styles.dateText}>
                        {moment(headerItem.section.title).format(
                          'dddd DD MMM yyy',
                        )}
                      </RegularText>
                      <FlatList
                        horizontal
                        data={headerItem.section.data}
                        // renderItem={(item) => <ListItem item={item} />}
                        renderItem={({item}) =>
                          renderItemHorizontal(
                            value.color_code,
                            value.name,
                            item,
                          )
                        }
                        showsHorizontalScrollIndicator={false}
                      />
                    </View>
                  </>
                );
              }}
            />
          </View>
        ) : null}
      </View>
    );
  };

  const onPressSelectedDate = (date) => {
    var date = moment(date).format('dddd DD MMM yyy');
    let practiceFeedbackReportDataSet = null;
    Object.entries(practiceFeedbackReport).map(([key, value]) => {
      var filterData = value.feedback.filter((l) => {
        return moment(l.created_at).format('dddd DD MMM yyy') === date;
      });

      var asss = {...value, feedback: filterData};

      console.log('asss', asss);

      practiceFeedbackReportDataSet = {
        ...practiceFeedbackReportDataSet,
        [key]: asss,
      };
    });

    setPracticeFeedbackReportData(practiceFeedbackReportDataSet);
    setSelectedDate(practiceFeedbackReportDataSet);
  };

  return (
    <Container style={styles.container}>
      <Content showsVerticalScrollIndicator={false}>
        {practiceFeedbackReport && (
          <View style={styles.filterView}>
            <DatePickerModal
              placeholder={Languages.filterDate}
              setSelectedDate={(date) => onPressSelectedDate(date)}
              selectedDate={selectedDate}
            />
            <SolidButton
              buttonStyle={styles.buttonStyle}
              title={Languages.all}
              onPress={() =>
                setPracticeFeedbackReportData(practiceFeedbackReport)
              }
            />
          </View>
        )}

        {practiceFeedbackReportData &&
          Object.entries(practiceFeedbackReportData).map(([key, value]) => {
            return renderItem(key, value);
          })}
      </Content>
    </Container>
  );
};
export default FeedbackReports;
