import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Navigation from './router';
import Loading from '../../Components/Loading';
import {GlobalStyles} from '@common';
import ReduxPersist from '../../Utils/reduxPersist';
import Actions from '../../Redux/Root/reducer';
import {Root} from 'native-base';

export default () => {
  const loading = useSelector((state) => state.app.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ReduxPersist.active) {
      dispatch(Actions.startup());
    }
  });

  return (
    <View style={[GlobalStyles.style.flex1]}>
      <Root>
        <Navigation />
      </Root>
      {!loading ? null : <Loading />}
    </View>
  );
};
