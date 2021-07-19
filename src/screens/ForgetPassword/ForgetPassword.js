//import liraries
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ScrollView, Alert, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/AntDesign';
import { ContainerWithHeader } from '../../layouts/globalLayout';
import {
    Text,
    TextInput,
    FormContainer,
    SubmitButton,
} from '../../layouts/ForgetPassword';
import { IMLocalized } from '../../services/localization/IMLocalization';
import { forgotEmailSchema } from '~/model';

const defaultValues = {
    email: '',
};

const ForgetPassword = ({ navigation }) => {
    const { control, formState, handleSubmit, setValue } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(forgotEmailSchema),
    });

    const { isValid, dirtyFields, errors } = formState;

    const onSubmit = (model) => {
        Alert.alert(
            IMLocalized('ForgotPassword'),
            IMLocalized('We have sent the link'),
            [
                {
                    text: IMLocalized('OK'),
                    onPress: () => navigation.goBack(),
                },
            ],
        );
    };
    return (
        <ScrollView>
            <ContainerWithHeader display="flex" align="center" justify="center">
                <Text padding>{IMLocalized('Reset Your Password')}</Text>
                <Text>{IMLocalized('Please Provide your account email')}</Text>
                <FormContainer>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                onChangeText={(text) => onChange(text)}
                                placeholder={IMLocalized('emailAddress')}
                                errorProps={!!errors.email}
                                value={value}
                                errorMessage={errors?.email?.message}
                                rightIcon={
                                    <TouchableOpacity
                                        onPress={() => setValue('email', '')}
                                    >
                                        <Icon
                                            name="closecircleo"
                                            size={20}
                                            color="gray"
                                        />
                                    </TouchableOpacity>
                                }
                                leftIcon={
                                    <Icon name="mail" size={20} color="gray" />
                                }
                            />
                        )}
                    />
                    <SubmitButton
                        type="outline"
                        title={IMLocalized('Request Reset Code')}
                        disabled={_.isEmpty(dirtyFields) || !isValid}
                        onPress={handleSubmit(onSubmit)}
                        raised
                    />
                </FormContainer>
            </ContainerWithHeader>
        </ScrollView>
    );
};

export default ForgetPassword;
