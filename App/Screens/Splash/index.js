import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Image, Text} from 'react-native';
import {Container} from 'native-base';
import styles from './styles';
import {Images} from '@common';

const Splash = ({navigation}) => {
  useEffect(() => {});
  const dispatch = useDispatch();
  return (
    <Container style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={Images.splash}
        // resizeMode="center"
      />
    </Container>
  );
};
export default Splash;
