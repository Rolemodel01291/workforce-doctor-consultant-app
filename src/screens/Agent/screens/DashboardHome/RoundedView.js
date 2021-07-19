import React from 'react';
import {
    FlexBetweenView,
    RoundedView,
    GrayText,
    DarkGrayText,
} from '../../../../layouts/globalLayout';
import RequireText from '../../../../components/RequireText';

const AgentRoundedView = (props) => {
    const text = props.text;
    const value = props.value;

    return (
        <RoundedView>
            <FlexBetweenView width="96" paddingHorizontal={2}>
                <RequireText>
                    <GrayText fontSize={14}>{text}</GrayText>
                </RequireText>
                <DarkGrayText fontSize={15}>{value}</DarkGrayText>
            </FlexBetweenView>
        </RoundedView>
    );
};

export default AgentRoundedView;
