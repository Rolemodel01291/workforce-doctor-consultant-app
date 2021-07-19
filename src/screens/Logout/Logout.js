import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Overlay } from 'react-native-elements';
import Button from '~/components/Button';
import { TouchableOpacity } from 'react-native';
import { Container, ButtonGroup } from '../../layouts/Logout';
import { DarkGrayText } from '../../layouts/globalLayout';
import { signOut } from '../../store/reducers/authReducer';
import { Routes } from '../../app-config/constants';

const Logout = ({ navigation }) => {
    const [visible, setVisible] = useState(true);
    const dispatch = useDispatch();

    useFocusEffect(
        React.useCallback(() => {
            setVisible(true);
        }, []),
    );
    const handleLogout = () => {
        toggleOverlay();
        dispatch(signOut(true));
        navigation.replace(Routes.ROLE);
    };

    const handleBack = () => {
        console.log('sdf');
        toggleOverlay();
        navigation.goBack();
    };

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    return (
        <Overlay
            isVisible={visible}
            onBackdropPress={toggleOverlay}
            overlayStyle={{
                borderRadius: 10
            }}>
            <Container>
                <DarkGrayText>Do you really Sign out?</DarkGrayText>
                <ButtonGroup>
                    <TouchableOpacity>
                        <Button width={20} text="No" onPress={handleBack} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Button width={20} text="Yes" onPress={handleLogout} />
                    </TouchableOpacity>
                </ButtonGroup>
            </Container>
        </Overlay>
    );
};

export default Logout;
