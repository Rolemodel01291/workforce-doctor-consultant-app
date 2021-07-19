import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import _ from 'lodash';
import firestore from '@react-native-firebase/firestore';
import {
    Container,
    ShadowContainer,
    FlexBetweenView,
    GrayText,
} from '../../../../layouts/globalLayout';
import Button from '../../../../components/Button';
import TextInput from '../../../../components/TextInput';
import { theme } from '../../../../app-config/theme';
import {
    ContentContainer,
    DatePickerContainer,
} from '../../../../layouts/Agent/AddNotes';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { actions, Routes } from '../../../../app-config/constants';
import { avatarImg } from '../../../../assets/images';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import DatePicker from '../../../../components/DatePicker';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { noteSchema } from '~/model';
import { setNotes } from '../../../../store/reducers/agentReducer';
import { DescriptionInput } from '../../../../layouts/components/TextInput';
import { addDoctorNotes } from '../../../../store/reducers/doctorReducer';

const defaultValues = {
    authorName: '',
    authorId: '',
    authorReference: null,
    createDate: new Date(),
    note: '',
    title: '',
};

const AddNotes = ({ navigation }) => {
    const dispatch = useDispatch();
    const agent = useSelector(({ agent }) => agent);
    const auth = useSelector(({ auth }) => auth.userData);
    const selectedCase = useSelector(({ agent }) => agent.selectedCase);

    const { control, formState, handleSubmit, setError, setValue } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(noteSchema),
    });

    const { isValid, dirtyFields, errors } = formState;

    const onSubmit = (model) => {
        const authorReference = firestore()
            .collection('PCDoctors')
            .doc(auth.uid);
        console.log({ ...model, authorId: auth.uid, authorReference });
        dispatch(
            addDoctorNotes({
                ...model,
                authorId: auth.uid,
                authorReference,
                caseId: selectedCase.caseId,
            }),
        );
        navigation.goBack();
    };

    return (
        <ScrollView>
            <Container display="flex" align="center" justify="flex-start">
                <ContentContainer>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                width={90}
                                height={7.5}
                                value={value}
                                errorProps={!!errors.title}
                                errorMessage={errors?.title?.message}
                                onChangeText={(text) => onChange(text)}
                                placeholder="Title"
                            />
                        )}
                    />

                    <DatePickerContainer>
                        <GrayText fontSize={14}>Date of Injury:</GrayText>
                        <Controller
                            name="createDate"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <DatePicker
                                    mode={'date'}
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                    </DatePickerContainer>
                    <Controller
                        name="authorName"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                width={90}
                                height={7.5}
                                value={value}
                                errorProps={!!errors.authorName}
                                errorMessage={errors?.authorName?.message}
                                onChangeText={(text) => onChange(text)}
                                placeholder="Author Name"
                            />
                        )}
                    />
                    {/* <ShadowContainer> */}
                    <Controller
                        name="note"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <DescriptionInput
                                value={value}
                                onChangeText={(text) => onChange(text)}
                                textAlignVertical="top"
                                multiline={true}
                                placeholder="Description"
                            />
                        )}
                    />
                    {/* </ShadowContainer> */}
                </ContentContainer>
                <FlexBetweenView
                    width={100}
                    paddingLeft={4}
                    paddingRight={4}
                    paddingTop={4}>
                    {agent.action !== actions.DETAIL_NOTE && (
                        <Button
                            width={30}
                            text="Save"
                            onPress={handleSubmit(onSubmit)}
                            disabled={_.isEmpty(dirtyFields) || !isValid}
                        />
                    )}
                    {agent.action !== actions.DETAIL_NOTE && (
                        <Button
                            width={30}
                            text="Cancel"
                            onPress={() => navigation.goBack()}
                        />
                    )}
                </FlexBetweenView>
            </Container>
        </ScrollView>
    );
};

export default AddNotes;
