import Signup from './Signup';
import {Routes} from '../../app-config/constants'

const SignupConfig = {
  name: Routes.SIGNUP,
  component: Signup,
  // options: {
  //   headerShown: false
  // },
  options: {
    header: ({ navigation, scene }) => (
        <Header title={'SIGN UP'} navigation={navigation} />
    ),
},
};

export default SignupConfig;
