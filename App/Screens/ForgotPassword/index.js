import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Image, Text, View} from 'react-native';
import {Container, Content} from 'native-base';
import styles from './styles';
import {Languages} from '@common';
// import {SolidButton} from '@Buttons';
import {SolidButton} from '@Buttons';
import {XLText, LargeText, RegularText} from '@Typography';
import {Card, CardItem} from 'native-base';
import TextField from '../../Components/TextField';
import CustomPicker from '../../Components/CustomPicker';
// import {Icon} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserActions from '../../Redux/User/reducer';
import AppAction from '../../Redux/Root/reducer';
const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState();

  useEffect(() => {});
  const dispatch = useDispatch();
  // forgotPassword
  const onPressLogin = () => {
    // alert('Please Check your mail');
    // navigation.navigate('Login');

    var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    // navigation.navigate('MainTab');
    if (!email) {
      dispatch(AppAction.showToast({message: Languages.pleaseEnterEmail}));
    } else if (regEmail.test(email) === false) {
      dispatch(AppAction.showToast({message: Languages.pleaseEnterValidEmail}));
    } else {
      var paramData = {
        email: email,
      };
      dispatch(UserActions.forgotPassword(paramData));
    }
  };
  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.contentStyle}>
        <Card borderRadius={10} style={styles.cardStyle}>
          <TextField
            placeHolder={Languages.enterEnmail}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <SolidButton
            title={Languages.submit}
            onPress={() => onPressLogin()}
          />
        </Card>
      </Content>
    </Container>
  );
};
export default ForgotPassword;
