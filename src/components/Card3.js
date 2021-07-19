import React from 'react';
import { DarkGrayText, GrayText, BlueText } from '../layouts/globalLayout';
import {
    Card3Container,
    TextGroup,
    ButtonContainer,
    ButtonSection,
    ContentContainer,
} from '../layouts/components/Card3';
import { withNavigation } from '@react-navigation/compat';
import { theme } from '~/app-config/theme';
import { TouchableOpacity, View, Text } from 'react-native';
import { Routes } from '../app-config/constants';
import Button from './Button';

const Component = (props) => {
    const { title, description, onPress } = props;

    return (
        <Card3Container>
            <ContentContainer>
                <TextGroup>
                    <DarkGrayText fontSize="16">{title}</DarkGrayText>
                    <GrayText fontSize={12}>{description}</GrayText>
                </TextGroup>
                <ButtonContainer>
                    <ButtonSection>
                        <Button
                            type="outline"
                            width={20}
                            backgroundColor={theme.main.colors.white}
                            borderColor={theme.main.colors.gray}
                            color={theme.main.colors.blue}
                            text="Detail"
                            onPress={onPress}
                        />
                    </ButtonSection>
                </ButtonContainer>
            </ContentContainer>
        </Card3Container>
    );
};

export default withNavigation(Component);
