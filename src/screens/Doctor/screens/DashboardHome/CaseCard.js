import React from 'react';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { Routes } from '../../../../app-config/constants';
import { CaseCardContainer } from '../../../../layouts/Doctor/Dashboard';
import { doctor3Img } from '../../../../assets/images';
import { Card } from 'react-native-elements';
import { WhiteText } from '../../../../layouts/globalLayout';

const CaseCard = (props) => {
    const { date, total, time } = props;

    return (
        <CaseCardContainer>
            <WhiteText fontSize={20}>Current active case list</WhiteText>
            <WhiteText fontSize={10}>{`Admitted on ${date}`}</WhiteText>
            <WhiteText fontSize={14}>{`Total case ${total}| Next visit on ${time}`}</WhiteText>
            <WhiteText fontSize={14}>View Details</WhiteText>
        </CaseCardContainer>
    );
};

export default CaseCard;
