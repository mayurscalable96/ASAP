import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {Container, Content} from 'native-base';
import styles from './styles';
import {Languages} from '@common';
import {SolidButton} from '@Buttons';
import {XLText, LargeText, RegularText} from '@Typography';
import {Card, CardItem} from 'native-base';
import TextField from '../../Components/TextField';
import AppAction from '../../Redux/Root/reducer';
import UserActions from '../../Redux/User/reducer';

const UserProfile = ({navigation}) => {
  const [userName, setUserName] = useState();
  const [profession, setProfession] = useState();
  const [mobNo, setMobNo] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    var userData = user.user;
    setUserName(userData.name);
    setProfession(userData.profession);
    setMobNo(userData.mobile_no);
  }, [user]);

  const onPressUpdateProfile = () => {
    if (!userName) {
      dispatch(AppAction.showToast({message: Languages.pleaseEnterFullNameL}));
    } else if (!mobNo) {
      dispatch(AppAction.showToast({message: Languages.pleaseEnterMobileNo}));
    } else if (mobNo.length < 9) {
      dispatch(
        AppAction.showToast({message: Languages.pleaseEnterValidMobilNo}),
      );
    } else {
      var paramData = {
        name: userName,
        mobile_no: mobNo,
        profession: profession,
      };
      dispatch(UserActions.updateProfile(paramData));
    }
  };
  const onPressChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.contentStyle}>
        <Card borderRadius={10} style={styles.cardStyle}>
          <View style={styles.registerView}>
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
            <TouchableOpacity onPress={onPressChangePassword}>
              <RegularText textStyle={styles.changePassword}>
                {Languages.changePassword}
              </RegularText>
            </TouchableOpacity>
            <SolidButton
              title={Languages.update}
              onPress={() => onPressUpdateProfile()}
            />
          </View>
        </Card>
      </Content>
    </Container>
  );
};
export default UserProfile;
