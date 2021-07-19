import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const SplashLogo = styled.Image({
  height: hp(100),
  width: wp(100),
  resizeMode: 'stretch'
});
