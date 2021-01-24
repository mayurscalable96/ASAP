import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Image, Text, View} from 'react-native';
import {Container, Content} from 'native-base';
import styles from './styles';
import {Languages} from '@common';
import {SolidButton} from '@Buttons';
import {XLText, LargeText, RegularText} from '@Typography';
import {Card, CardItem} from 'native-base';
import TextField from '../../Components/TextField';
import AppAction from '../../Redux/Root/reducer';
import UserActions from '../../Redux/User/reducer';

const Registration = ({navigation}) => {
  const [userName, setUserName] = useState();
  const [profession, setProfession] = useState();
  const [mobNo, setMobNo] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  useEffect(() => {});
  const dispatch = useDispatch();

  const onPressRegister = () => {
    var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    // navigation.navigate('MainTab');
    if (!userName) {
      dispatch(AppAction.showToast({message: Languages.pleaseEnterFullNameL}));
    } else if (!mobNo) {
      dispatch(AppAction.showToast({message: Languages.pleaseEnterMobileNo}));
    } else if (mobNo.length < 9) {
      dispatch(
        AppAction.showToast({message: Languages.pleaseEnterValidMobilNo}),
      );
    } else if (!email) {
      dispatch(AppAction.showToast({message: Languages.pleaseEnterEmail}));
    } else if (regEmail.test(email) === false) {
      dispatch(AppAction.showToast({message: Languages.pleaseEnterValidEmail}));
    } else if (!password) {
      dispatch(AppAction.showToast({message: Languages.pleaseEnterPassword}));
    } else if (!confirmPassword) {
      dispatch(
        AppAction.showToast({message: Languages.pleaseEnterConfirmPassword}),
      );
    } else if (password !== confirmPassword) {
      dispatch(AppAction.showToast({message: Languages.passwordNotMatch}));
    } else {
      var paramData = {
        name: userName,
        email: email,
        password: password,
        mobile_no: mobNo,
        profession: profession,
      };
      dispatch(UserActions.register(paramData));
    }
  };

  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.contentStyle}>
        <Card borderRadius={10} style={styles.cardStyle}>
          <View style={styles.registerView}>
            <XLText textStyle={styles.headingTextStyle}>
              {Languages.userRegistration}
            </XLText>
            <TextField
              placeHolder={Languages.enterFullName}
              onChangeText={(text) => setUserName(text)}
              value={userName}
            />
            <TextField
              placeHolder={Languages.enterProfession}
              onChangeText={(text) => setProfession(text)}
              value={profession}
            />
            <TextField
              placeHolder={Languages.enterMobileNo}
              onChangeText={(text) => setMobNo(text)}
              value={mobNo}
            />
            <TextField
              placeHolder={Languages.enterEnmail}
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <TextField
              placeHolder={Languages.enterPassword}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
            />
            <TextField
              placeHolder={Languages.enterConfirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              secureTextEntry={true}
            />
            <SolidButton
              title={Languages.register}
              onPress={() => onPressRegister()}
            />
          </View>
          <View style={styles.loginView}>
            <RegularText textStyle={styles.alreadyRegister}>
              {Languages.alreadyRegister}
            </RegularText>
            <SolidButton
              title={Languages.clickhereToLogin}
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </Card>
      </Content>
    </Container>
  );
};
export default Registration;
