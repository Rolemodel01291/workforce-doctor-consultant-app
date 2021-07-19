//import liraries
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import Icon from 'react-native-vector-icons/Entypo';
import _ from 'lodash';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Container, FlexBetweenContainer } from '~/layouts/globalLayout';
import {
    LoginText,
    TextInput,
    FormContainer,
    SubmitButton,
    RememberCheckBox,
    WhiteText,
    ForgetButton,
} from '~/layouts/Login';
import { Routes } from '~/app-config/constants';
import { IMLocalized } from '~/services/localization/IMLocalization';
import { ScrollView } from 'react-native';
import { loginSchema } from '~/model';
import { signIn, setRememberMe } from '../../store/reducers/authReducer';
import LoadingSpinner from '~/components/LoadingSpinner';
import notifee from '@notifee/react-native';
// import PushNotification from 'react-native-push-notification';

const defaultValues = {
    email: '',
    password: '',
};

// create a component
const LoginScreen = ({ navigation }) => {
    const role = useSelector(({ auth }) => auth.role);
    const dispatch = useDispatch();
    const login = useSelector(({ auth }) => auth);
    const [showPassword, setshowPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const checked = useSelector(({ auth }) => auth.checked);
    const { control, formState, handleSubmit, setError } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(loginSchema),
    });

    

    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if(enabled){
            console.log("Authorization status:", authStatus)
            getFcmToken()
        }
    }

    useEffect(() => {
        login.errors.forEach((error) => {
            setError(error.type, {
                type: 'manual',
                message: error.message,
            });
        });
        requestUserPermission()
    }, [login.errors, setError]);

    async function onDisplayNotification() {
        // Create a channel
        const channelId = await notifee.createChannel({
          id: 'workforce',
          name: 'Workforce Channel',
        });
        
        // Display a notification
        await notifee.displayNotification({
          title: 'Notification Title',
          body: 'Main body content of the notification',
          android: {
            channelId,
            // smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
          },
        });
      }

    useEffect(()=>{
        const unsubscribe = messaging().onMessage(async remoteMessage =>{
            console.log("----------------",JSON.stringify(remoteMessage))
            // Alert.alert("A new message arrived!", JSON.stringify(remoteMessage))
            
              onDisplayNotification()            
     
        })
        
        return unsubscribe
    },[])

    const getFcmToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
         console.log(fcmToken);
         console.log("Your Firebase Token is:", fcmToken);
        } else {
         console.log("Failed", "No token received");
        }
      }

    const { isValid, dirtyFields, errors } = formState;

    const onSubmit = async (model) => {
        const fcmToken = await messaging().getToken();
        console.log(fcmToken)
        setLoading(true);
        dispatch(signIn({ ...model, isRemember: checked, role, fcmToken })).then(
            (res) => {
                setLoading(false);
                if (!res.payload.error) {
                    navigation.replace(role);
                }
            },
        );
    };

    return (
        <ScrollView>
            <Container main display="flex" align="center" justify="center">
                <LoadingSpinner isLoading={loading} />
                <LoginText>
                    {role === Routes.AGENT
                        ? IMLocalized('agent')
                        : role === Routes.DOCTOR
                        ? IMLocalized('doctor')
                        : IMLocalized('patient')}
                </LoginText>
                <FormContainer>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                value={value}
                                onChangeText={(text) => onChange(text)}
                                placeholder={IMLocalized('userName')}
                                errorProps={!!errors.email}
                                errorMessage={errors?.email?.message}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                value={value}
                                placeholder={IMLocalized('password')}
                                onChangeText={(text) => onChange(text)}
                                secureTextEntry={showPassword}
                                errorProps={!!errors.password}
                                errorMessage={errors?.password?.message}
                                rightIcon={
                                    showPassword ? (
                                        <TouchableOpacity
                                            onPress={() =>
                                                setshowPassword(false)
                                            }>
                                            <Icon
                                                name="eye"
                                                size={24}
                                                color="white"
                                            />
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            onPress={() =>
                                                setshowPassword(true)
                                            }>
                                            <Icon
                                                name="eye-with-line"
                                                size={24}
                                                color="white"
                                            />
                                        </TouchableOpacity>
                                    )
                                }
                            />
                        )}
                    />
                    <SubmitButton
                        type="outline"
                        title={IMLocalized('signIn')}
                        disabled={_.isEmpty(dirtyFields) || !isValid}
                        onPress={handleSubmit(onSubmit)}
                    />
                    <FlexBetweenContainer>
                        <RememberCheckBox
                            title={IMLocalized('Remember me')}
                            checked={checked}
                            onPress={() => dispatch(setRememberMe(!checked))}
                        />
                        <ForgetButton
                            onPress={() =>
                                navigation.navigate(Routes.FORGETPASSWORD)
                            }>
                            <WhiteText>
                                {IMLocalized('ForgotPassword?')}
                            </WhiteText>
                        </ForgetButton>
                    </FlexBetweenContainer>
                </FormContainer>
            </Container>
        </ScrollView>
    );
};

//make this component available to the app
export default LoginScreen;
