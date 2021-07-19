import React from 'react';
import { WrapContainer, AvatarImage } from '../../../../layouts/globalLayout';
import Button from '../../../../components/Button';
import { theme } from '../../../../app-config/theme';
import { ButtonGroup } from '../../../../layouts/Agent/SchedulesDetail';
import { IMLocalized } from '../../../../services/localization/IMLocalization';
import { Routes } from '../../../../app-config/constants';
import { avatarImg } from '../../../../assets/images';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Card2 from '../../../../components/Card2';

const SchedulesDetail = ({ navigation }) => {
    const items = [
        {
            image: avatarImg,
            name: 'Anatollo',
            number: 'case number 123456789',
            time: '11.00-12.00',
            checked: true,
        },
        {
            image: avatarImg,
            name: 'Anatollo',
            number: 'case number 123456789',
            time: '11.00-12.00',
            checked: true,
        },
        {
            image: avatarImg,
            name: 'Anatollo',
            number: 'case number 123456789',
            time: '11.00-12.00',
            checked: false,
        },
        {
            image: avatarImg,
            name: 'Anatollo',
            number: 'case number 123456789',
            time: '11.00-12.00',
            checked: true,
        },
        {
            image: avatarImg,
            name: 'Anatollo',
            number: 'case number 123456789',
            time: '11.00-12.00',
            checked: true,
        },
    ];

    function onChange(text) {
        console.log(text);
    }

    return (
        <ScrollView>
            <WrapContainer display="flex" align="center" justify="flex-start">
                {/* <ButtonGroup>
                <TouchableOpacity>
                <Button width={20} height={4} text='Today' backgroundColor={theme.main.colors.green}></Button>
                </TouchableOpacity>
                <TouchableOpacity>
                <Button width={20} height={4} text='Today' backgroundColor={theme.main.colors.green}></Button>
                </TouchableOpacity>
                <TouchableOpacity>
                <Button width={20} height={4} text='Today' backgroundColor={theme.main.colors.green}></Button>
                </TouchableOpacity>
            </ButtonGroup> */}

                {items.map((item) => (
                    <Card2
                        image={item.image}
                        name={item.name}
                        number={item.number}
                        time={item.time}
                        checked={item.checked}
                    />
                ))}
            </WrapContainer>
        </ScrollView>
    );
};

export default SchedulesDetail;
