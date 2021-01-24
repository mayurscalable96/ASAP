import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Image,
  Text,
  View,
  FlatList,
  ViewPagerAndroidComponent,
} from 'react-native';
import {Container, Content} from 'native-base';
import styles from './styles';
import {Languages} from '@common';
import {SolidButton} from '@Buttons';
import {XLText, LargeText, RegularText} from '@Typography';
import {Card, CardItem} from 'native-base';
import TextField from '../../Components/TextField';
import CustomPicker from '../../Components/CustomPicker';
import ColorPalette from 'react-native-color-palette';
import {Icon} from 'react-native-elements';
import {Constants, Fonts, Images, GlobalStyles, Colors} from '@common';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppAction from '../../Redux/Root/reducer';
import PracticesActions from '../../Redux/Practices/reducer';
import AlertApi from '../../Services/alert';

const data = [
  {
    id: '1',
    colorHex: '#808080',
  },
  {
    id: '2',
    colorHex: '#C0C0C0',
  },
  {
    id: '3',
    colorHex: '#800000',
  },
  {
    id: '4',
    colorHex: '#8E44AD',
  },
  {
    id: '5',
    colorHex: '#FF0000',
  },
  {
    id: '6',
    colorHex: '#808000',
  },
  {
    id: '7',
    colorHex: '#FFFF00',
  },
  {
    id: '8',
    colorHex: '#008000',
  },
  {
    id: '9',
    colorHex: '#00FF00',
  },
  {
    id: '10',
    colorHex: '#008080',
  },
  {
    id: '11',
    colorHex: '#00FFFF',
  },
  {
    id: '12',
    colorHex: '#000080',
  },
  {
    id: '13',
    colorHex: '#0000FF',
  },
  {
    id: '14',
    colorHex: '#FF00FF',
  },
];

const CreatePractice = ({navigation}) => {
  const [selectedColor, setSelectedColor] = useState();
  const [practiceName, setPracticeName] = useState();
  const user = useSelector((state) => state.user);
  const {listPractice, practiceFeedback} = useSelector(
    (state) => state.practices,
  );
  useEffect(() => {}, []);
  const dispatch = useDispatch();
  const onPressSave = () => {
    if (!practiceName) {
      dispatch(
        AppAction.showToast({message: Languages.pleaseEnterPracticeName}),
      );
    } else if (!selectedColor) {
      dispatch(AppAction.showToast({message: Languages.pleaseSelectColorTag}));
    } else {
      // navigation.navigate('FeedbackEntry');
      var paramData = {
        name: practiceName,
        color_code: selectedColor,
        user_id: user.user.id,
      };
      dispatch(PracticesActions.createPractice(paramData));
    }
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => setSelectedColor(item.colorHex)}>
        <Icon
          name={selectedColor === item.colorHex ? 'check-circle' : 'circle'}
          type={GlobalStyles.Constants.iconType.material}
          color={item.colorHex}
          size={30}
          containerStyle={styles.iconContainerStyle}
        />
      </TouchableOpacity>
    );
  };

  const onPressPracticeDelete = async (item) => {
    const confirm = await AlertApi.confirm(
      Languages.deleteCreatedPractice,
      Languages.okay,
      Languages.cancel,
    );
    if (confirm) {
      dispatch(PracticesActions.practiceDelete({id: item.id}));
    }
  };

  const renderItemPracticeList = ({item}) => {
    console.log('item', item);
    return (
      <TouchableOpacity
        onPress={() => onPressPracticeDelete(item)}
        style={styles.practiceListTouchable}>
        <View style={styles.practiceListView}>
          <RegularText textStyle={styles.practiceListText}>
            {item.name}
          </RegularText>
          <Icon
            name={'delete'}
            type={GlobalStyles.Constants.iconType.material}
            color={item.color_code}
            size={30}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container style={styles.container}>
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentStyle}>
        <Card borderRadius={10} style={styles.cardStyle}>
          <TextField
            placeHolder={Languages.enterPracticeName}
            onChangeText={(text) => setPracticeName(text)}
            value={practiceName}
          />
          <RegularText textStyle={styles.colorTagText}>
            {Languages.selectColorTag}
          </RegularText>
          <View style={styles.flatListViewStyle}>
            <FlatList
              numColumns={5}
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
          <SolidButton title={Languages.save} onPress={() => onPressSave()} />
        </Card>

        <Card borderRadius={10} style={styles.cardStyle}>
          <RegularText textStyle={styles.colorTagText}>
            {Languages.practices}
          </RegularText>
          <FlatList
            data={listPractice}
            renderItem={renderItemPracticeList}
            keyExtractor={(item) => item.id}
          />
        </Card>
      </Content>
    </Container>
  );
};
export default CreatePractice;
