//import liraries
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from '~/layouts/globalLayout';
import { Routes } from '~/app-config/constants';
import { init } from '~/services/localization/IMLocalization';
import { splashImg } from '~/assets/images';
import { SplashLogo } from '~/layouts/Splash';
import auth from '@react-native-firebase/auth';

const Splash = ({ navigation }) => {
    const setLang = useSelector(({ auth }) => auth.language);
    const checked = useSelector(({ auth }) => auth.checked);
    const role = useSelector(({ auth }) => auth.role);

    useEffect(() => {
        if (setLang) {
            init(setLang);
        }
    }, [setLang]);

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
            if (user) {
                setTimeout(() => {
                    if (checked) {
                        navigation.replace(role);
                    } else {
                        auth().signOut();
                        navigation.replace(Routes.ROLE);
                    }
                }, 3000);
            } else {
                navigation.replace(Routes.ROLE);
            }
        });

        return subscriber; 
    }, []);

    return (
        <Container display="flex" align="center" justify="center">
            <SplashLogo source={splashImg} />
        </Container>
    );
};

export default Splash;
