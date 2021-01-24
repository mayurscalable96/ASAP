import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
import AppAction from '../../Redux/Root/reducer';
import UserActions from '../../Redux/User/reducer';

const ChangePassword = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const user = useSelector((state) => state.user);

  useEffect(() => {});
  const dispatch = useDispatch();

  const onPressSubmit = () => {
    // var userData = user.data.user;

    if (!oldPassword) {
      dispatch(
        AppAction.showToast({message: Languages.pleaseEnterOldPassword}),
      );
    } else if (!newPassword) {
      dispatch(
        AppAction.showToast({message: Languages.pleaseEnterNewPassword}),
      );
    } else if (!confirmPassword) {
      dispatch(
        AppAction.showToast({message: Languages.pleaseEnterConfirmPassword}),
      );
    } else if (confirmPassword !== newPassword) {
      dispatch(AppAction.showToast({message: Languages.passwordNotMatch}));
    } else {
      var paramData = {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      };
      dispatch(UserActions.changePassword(paramData));
      // navigation.navigate('UserProfile');
    }
  };
  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.contentStyle}>
        <Card borderRadius={10} style={styles.cardStyle}>
          <TextField
            placeHolder={Languages.oldPassword}
            onChangeText={(text) => setOldPassword(text)}
            value={oldPassword}
            secureTextEntry={true}
          />
          <TextField
            placeHolder={Languages.newPassword}
            onChangeText={(text) => setNewPassword(text)}
            value={newPassword}
            secureTextEntry={true}
          />
          <TextField
            placeHolder={Languages.confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry={true}
          />
          <SolidButton
            title={Languages.submit}
            onPress={() => onPressSubmit()}
          />
        </Card>
      </Content>
    </Container>
  );
};
export default ChangePassword;
