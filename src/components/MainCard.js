import React from 'react';
import _ from 'lodash';
import {
    FlexBetweenView,
    GrayText,
    DarkGrayText,
    RoundedImage,
    GreenText,
    WhiteText,
} from '../layouts/globalLayout';
import {
    Container,
    Content,
    TextGroup,
    Description,
    Time,
    ButtonGroup,
    DetailButton,
    CreateButton,
} from '../layouts/components/MainCard';
import IconButton from './IconButton';
import Checkbox from './Checkbox';
import { withNavigation } from '@react-navigation/compat';
import { theme } from '~/app-config/theme';
import { TouchableOpacity, View, Text } from 'react-native';
import { Routes } from '../app-config/constants';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import LinearGradient from 'react-native-linear-gradient';
import LinearGradient from './LinearGradient';

const Component = (props) => {
    const {
        navigation,
        image,
        title,
        text,
        time,
        isShowCheck,
        checked,
        type,
        buttonImage,
        route2,
        textGroupWidth,
        buttonGroupWidth,
        hasMoreElement,
        detailPress,
        iconPress,
        createPress,
        onPress,
        onCheck,
        data,
        selectedCases,
        buttonText2,
    } = props;

    return (
        <Container>
            <LinearGradient borderRadius={10}>
                <Content>
                    {type === 'HAS_CHILDREN' ? (
                        props.children
                    ) : (
                        <>
                            <TouchableOpacity onPress={(ev) => onPress(ev)}>
                                <FlexBetweenView justifyContent="flex-start">
                                    {image && (
                                        <RoundedImage
                                            source={image}
                                            borderRadius={100}
                                        />
                                    )}
                                    <TextGroup
                                        flexDirection={props.direction}
                                        width={textGroupWidth}>
                                        {title && (
                                            <DarkGrayText fontSize="16">
                                                {_.trim(title)}
                                            </DarkGrayText>
                                        )}
                                        {text && (
                                            <Description>
                                                <GrayText paddingTop={1}>
                                                    {text !== '' ? text : ' '}
                                                </GrayText>
                                            </Description>
                                        )}
                                    </TextGroup>
                                </FlexBetweenView>
                            </TouchableOpacity>
                            <ButtonGroup
                                flexDirection={props.direction}
                                width={buttonGroupWidth}>
                                {time && (
                                    <Time>
                                        <GreenText
                                            color={theme.main.colors.green}
                                            fontSize="13">
                                            {moment(time).format('MM/DD/YYYY')}
                                        </GreenText>
                                    </Time>
                                )}
                                <FlexBetweenView>
                                    {route2 && (
                                        <TouchableOpacity>
                                            {type === 'ICON_BUTTON' && (
                                                <IconButton
                                                    width={5}
                                                    source={buttonImage}
                                                    onPress={() =>
                                                        route2
                                                            ? navigation.navigate(
                                                                  route2,
                                                              )
                                                            : {}
                                                    }
                                                />
                                            )}
                                            {type === 'TEXT_BUTTON' && (
                                                <CreateButton
                                                    onPress={() =>
                                                        createPress()
                                                    }>
                                                    <WhiteText fontSize="11">
                                                        {buttonText2
                                                            ? buttonText2
                                                            : 'Create'}
                                                    </WhiteText>
                                                </CreateButton>
                                            )}
                                        </TouchableOpacity>
                                    )}
                                    <TouchableOpacity>
                                        {type === 'ICON_BUTTON' && (
                                            <Icon
                                                color={
                                                    props.iconColor
                                                        ? props.iconColor
                                                        : theme.main.colors
                                                              .fauxBlackOlive
                                                }
                                                name={props.icon}
                                                size={20}
                                                onPress={() => iconPress()}
                                            />
                                        )}
                                        {type === 'TEXT_BUTTON' && (
                                            <DetailButton
                                                onPress={() => detailPress()}>
                                                <WhiteText fontSize="11">
                                                    Detail
                                                </WhiteText>
                                            </DetailButton>
                                        )}

                                        {type === 'CHECK_BUTTON' && (
                                            <Checkbox
                                                onPress={() => onCheck(data)}
                                                checked={
                                                    selectedCases.length > 0
                                                        ? _.find(
                                                              selectedCases,
                                                              function (n) {
                                                                  return (
                                                                      n.caseId ===
                                                                      data.caseId
                                                                  );
                                                              },
                                                          )
                                                            ? true
                                                            : false
                                                        : false
                                                }
                                            />
                                        )}
                                    </TouchableOpacity>
                                </FlexBetweenView>

                                {props.children && (
                                    <FlexBetweenView>
                                       {props.children}
                                    </FlexBetweenView>
                                )}

                                {hasMoreElement && (
                                    <Text>{props.children}</Text>
                                )}
                            </ButtonGroup>
                            {isShowCheck && checked && (
                                <Icon
                                    style={{
                                        position: 'absolute',
                                        right: hp(-1),
                                        top: hp(-1),
                                    }}
                                    color={theme.main.colors.green}
                                    name="check-circle"
                                    size={20}
                                />
                            )}
                            {isShowCheck && !checked && (
                                <Icon
                                    style={{
                                        position: 'absolute',
                                        right: hp(-1),
                                        top: hp(-1),
                                    }}
                                    color={theme.main.colors.red}
                                    name="check-circle"
                                    size={20}
                                />
                            )}
                        </>
                    )}
                </Content>
            </LinearGradient>
        </Container>
    );
};

export default withNavigation(Component);
