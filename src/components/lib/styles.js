import { StyleSheet, Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

const SCREEN_WIDTH = width;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth:1,
  },
  basicContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  buttonView: {
    width: SCREEN_WIDTH,
    padding: 8,
    borderTopWidth: 0.5,
    borderTopColor: 'lightgrey',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bottomPicker: {
    width: SCREEN_WIDTH,
  },
  flag: {
    height: 20,
    width: 30,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#cecece',
    backgroundColor: '#cecece',
  },
  text: {
    width: wp(73),
    height: hp(4),
    padding: 0,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderWidth: 1,
  },
});
