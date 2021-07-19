import React from 'react';
import { dashboardImg } from '../../../../assets/images';
import {
    BackgroundContainer,
    HeaderBackgroundContainer,
    DoctorLogo,
    HeaderContainer,
} from '../../../../layouts/Agent/Dashboard';
import DashboardRoundedView from './RoundedView';
import { View } from 'react-native';

const texts = ['Total active case', 'This year', 'Cases resolved this year'];

const DashboardHeader = (props) => {
    const data = props.data;

    return (
        <View>
            <BackgroundContainer
                display="flex"
                align="center"
                justify="center"
                background={true}
                borderBottom={true}>
                <DoctorLogo source={dashboardImg} />
            </BackgroundContainer>

            <HeaderBackgroundContainer />
            <HeaderContainer>
                {texts.map((text, index) => (
                    <DashboardRoundedView
                        key={index}
                        text={text}
                        value={data[index]}
                    />
                ))}
            </HeaderContainer>
        </View>
    );
};

export default DashboardHeader;
