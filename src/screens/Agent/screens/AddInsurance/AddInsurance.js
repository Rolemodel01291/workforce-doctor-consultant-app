import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import _ from 'lodash';
import Button from '../../../../components/Button';
import TextInput from '../../../../components/TextInput';
import InputCard from '../../../../components/InputCard';
import { theme } from '../../../../app-config/theme';
import { ContentContainer } from '../../../../layouts/Agent/AddInsurance';
import { FlexBetweenView, GrayText } from '../../../../layouts/globalLayout';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { actions, Routes } from '../../../../app-config/constants';
import { avatarImg } from '../../../../assets/images';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import RequireText from '../../../../components/RequireText';
import { insuranceSchema } from '~/model';
import { setInsuranceInfo } from '../../../../store/reducers/agentReducer';

const defaultValues = {
    insuranceCompany: '',
    cityState: '',
    address: '',
    insuranceAdjuster: '',
    insurancePolicyNum: '',
    insuranceZip: '',
};

const AddInsurance = ({ navigation }) => {
    const agent = useSelector(({ agent }) => agent);
    const dispatch = useDispatch();

    const { control, formState, handleSubmit, setError, setValue } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(insuranceSchema),
    });

    const { isValid, dirtyFields, errors } = formState;

    useEffect(() => {
        if (
            !_.isEmpty(agent.case.InsuranceInfo) ||
            agent.action === actions.DETAIL_INSURANCE
        ) {
            setValue(
                'insuranceCompany',
                agent.case.InsuranceInfo.insuranceCompany,
            );
            setValue('cityState', agent.case.InsuranceInfo.cityState);
            setValue('address', agent.case.InsuranceInfo.address);
            setValue(
                'insuranceAdjuster',
                agent.case.InsuranceInfo.insuranceAdjuster,
            );
            setValue(
                'insurancePolicyNum',
                agent.case.InsuranceInfo.insurancePolicyNum,
            );
            setValue('insuranceZip', agent.case.InsuranceInfo.insuranceZip);
        }
    }, [agent.case]);

    const onSubmit = (model) => {
        console.log(model);
        dispatch(setInsuranceInfo(model));
        navigation.goBack();
    };

    return (
        <ScrollView>
            <ContentContainer>
                <InputCard>
                    <RequireText>
                        <GrayText fontSize="16">
                            Insurance Company Name
                        </GrayText>
                    </RequireText>
                    <Controller
                        name="insuranceCompany"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                width={83}
                                height={6}
                                value={value}
                                errorProps={!!errors.insuranceCompany}
                                errorMessage={errors?.insuranceCompany?.message}
                                onChangeText={(text) => onChange(text)}
                                placeholder=""
                                borderWid={0}
                            />
                        )}
                    />
                </InputCard>

                <InputCard>
                    <RequireText>
                        <GrayText fontSize="16">
                            Insurance Policy Number
                        </GrayText>
                    </RequireText>
                    <Controller
                        name="insurancePolicyNum"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                width={83}
                                height={6}
                                value={value}
                                keyboardType="numeric"
                                errorProps={!!errors.insurancePolicyNum}
                                errorMessage={
                                    errors?.insurancePolicyNum?.message
                                }
                                onChangeText={(text) => onChange(text)}
                                placeholder=""
                                borderWid={0}
                            />
                        )}
                    />
                </InputCard>

                <InputCard>
                    <RequireText>
                        <GrayText fontSize="16">Insurance Adjuster</GrayText>
                    </RequireText>
                    <Controller
                        name="insuranceAdjuster"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                width={83}
                                height={6}
                                value={value}
                                errorProps={!!errors.insuranceAdjuster}
                                errorMessage={
                                    errors?.insuranceAdjuster?.message
                                }
                                onChangeText={(text) => onChange(text)}
                                placeholder=""
                                borderWid={0}
                            />
                        )}
                    />
                </InputCard>

                <InputCard>
                    <RequireText>
                        <GrayText fontSize="16">Address</GrayText>
                    </RequireText>
                    <Controller
                        name="address"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                width={83}
                                height={6}
                                value={value}
                                errorProps={!!errors.address}
                                errorMessage={errors?.address?.message}
                                onChangeText={(text) => onChange(text)}
                                placeholder=""
                                borderWid={0}
                            />
                        )}
                    />
                </InputCard>

                <InputCard>
                    <RequireText>
                        <GrayText fontSize="16">City/State</GrayText>
                    </RequireText>
                    <Controller
                        name="cityState"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                width={83}
                                height={6}
                                value={value}
                                onChangeText={(text) => onChange(text)}
                                errorProps={!!errors.cityState}
                                errorMessage={errors?.cityState?.message}
                                placeholder=""
                                borderWid={0}
                            />
                        )}
                    />
                </InputCard>

                <InputCard>
                    <RequireText>
                        <GrayText fontSize="16">Zip Code</GrayText>
                    </RequireText>
                    <Controller
                        name="insuranceZip"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                width={83}
                                height={6}
                                value={value}
                                keyboardType="numeric"
                                onChangeText={(text) => onChange(text)}
                                errorProps={!!errors.insuranceZip}
                                errorMessage={errors?.insuranceZip?.message}
                                placeholder=""
                                borderWid={0}
                            />
                        )}
                    />
                </InputCard>
            </ContentContainer>
            <FlexBetweenView
                backgroundColor={theme.main.colors.white}
                width={100}
                paddingLeft={4}
                paddingRight={4}
                paddingTop={2}
                paddingBottom={4}>
                {agent.action !== actions.DETAIL_INSURANCE && (
                    <Button
                        width={30}
                        text="Save"
                        onPress={handleSubmit(onSubmit)}
                        disabled={_.isEmpty(dirtyFields) || !isValid}
                    />
                )}

                {agent.action !== actions.DETAIL_INSURANCE && (
                    <Button
                        width={30}
                        text="Cancel"
                        onPress={() => navigation.goBack()}
                    />
                )}
            </FlexBetweenView>
        </ScrollView>
    );
};

export default AddInsurance;
