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
    WrapContainer,
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
import {DescriptionInput} from '../../../../layouts/components/TextInput'

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

    const { control, formState, handleSubmit, setError, setValue } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(noteSchema),
    });

    const { isValid, dirtyFields, errors } = formState;

    useEffect(() => {
        if (
            agent.case.notes.length > 0 &&
            agent.action !== actions.DETAIL_NOTE
        ) {
            const existNote = agent.case.notes.filter(
                (o) => o.authorId === auth.uid,
            );
            if (existNote.length > 0) {
                setValue('authorName', existNote[0].authorName);
                setValue('createDate', existNote[0].createDate);
                setValue('note', existNote[0].note);
                setValue('title', existNote[0].title);
            }
        } else if (agent.action === actions.DETAIL_NOTE) {
            setValue('authorName', agent.detailNote.authorName);
            setValue('createDate', agent.detailNote.createDate.toDate());
            setValue('note', agent.detailNote.note);
            setValue('title', agent.detailNote.title);
        }
    }, [agent]);

    const onSubmit = (model) => {
        const authorReference = firestore()
            .collection('Agents')
            .doc(auth.uid)
            .collection('BusinessAgent')
            .doc(auth.uid);
        console.log({ ...model, authorId: auth.uid, authorReference });
        dispatch(setNotes({ ...model, authorId: auth.uid, authorReference }));
        navigation.goBack();
    };

    return (
        <ScrollView style={{backgroundColor: theme.main.colors.white}}>
            <WrapContainer display="flex" align="center" justify="flex-start">
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
                    width={90}
                   marginVertical={4}>
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
            </WrapContainer>
        </ScrollView>
    );
};

export default AddNotes;
