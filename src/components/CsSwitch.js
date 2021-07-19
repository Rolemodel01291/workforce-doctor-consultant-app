import React from 'react';
import { Switch, Platform } from 'react-native';

// import materialTheme from '../constants/Theme';

const MkSwitch = props => {
  const { value, ...rest } = props;
  const thumbColor = Platform.OS === 'ios' ? null : 
    Platform.OS === 'android' && value ? 'greed' : 'red';

  return (
    <Switch
      value={value}
      thumbColor={thumbColor}
      ios_backgroundColor={'blue'}
      trackColor={{ false: 'gray', true: 'white' }}
      {...rest}
    />
  );
}

export default MkSwitch;