import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Image, Text, View, TouchableOpacity, BackHandler} from 'react-native';
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
import {Images} from '@common';

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true);
  }, []);
  const dispatch = useDispatch();

  const onPressLogin = () => {
    var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    // navigation.navigate('MainTab');
    if (!email) {
      dispatch(AppAction.showToast({message: Languages.pleaseEnterEmail}));
    } else if (regEmail.test(email) === false) {
      dispatch(AppAction.showToast({message: Languages.pleaseEnterValidEmail}));
    } else if (!password) {
      dispatch(AppAction.showToast({message: Languages.pleaseEnterPassword}));
    } else {
      var paramData = {
        email: email,
        password: password,
      };
      dispatch(UserActions.login(paramData));
    }
    // navigation.navigate('MainTab');
  };
  const onPressForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };
  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.contentStyle}>
        <Card borderRadius={10} style={styles.cardStyle}>
          <View style={styles.loginView}>
            <XLText textStyle={styles.headingTextStyle}>
              {Languages.userLogin}
            </XLText>
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
            <TouchableOpacity onPress={onPressForgotPassword}>
              <RegularText textStyle={styles.forgotPasswordText}>
                {Languages.forgotPassword}
              </RegularText>
            </TouchableOpacity>
            <SolidButton
              title={Languages.login}
              onPress={() => onPressLogin()}
            />
          </View>
          <View style={styles.registerView}>
            <RegularText textStyle={styles.newUser}>
              {Languages.newUser}
            </RegularText>
            <SolidButton
              title={Languages.registerAsNewUser}
              onPress={() => navigation.navigate('Registration')}
            />
            {/* <RegularText textStyle={styles.registerText}>
              {Languages.registerText}
            </RegularText> */}
          </View>
        </Card>
        <View style={styles.imageViewStyle}>
          <Image
            style={styles.imageStyle}
            source={Images.logo}
            resizeMode="center"
          />
        </View>
      </Content>
    </Container>
  );
};
export default Login;
