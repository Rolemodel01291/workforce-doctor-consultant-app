import React, { useEffect, useState, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { theme } from '../app-config/theme';
import { WeekItem, ScrollView } from '../layouts/components/Week';
import { GrayText, WhiteText } from '../layouts/globalLayout';
import { WeekItems } from '../app-config/constants';

const Week = (props) => {
    const isFocused = useIsFocused();
    const scrollRef = useRef();
    const [weekItems, setWeekItems] = useState([]);

    useEffect(() => {
        if (isFocused) {
            scrollRef.current.scrollTo({ x: 0, y: 100, animated: true });
            setWeekItems(WeekItems);
        }
    }, [isFocused]);

    const handleWeekbar = (index) => {
        scrollRef.current.scrollTo({ x: 38 * index, y: 100, animated: true });
        weekItems.map((value, indexTemp) => {
            weekItems[indexTemp].status = index == indexTemp ? true : false;
        });
        setWeekItems([...weekItems]);
        props.onPress(index)
    };
    return (
        <ScrollView
            ref={scrollRef}
            horizontal={true}
            pagingEnabled={true}
            decelerationRate={0}
            scrollEventThrottle={16}
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            snapToInterval={10 * 0.375}
        >
            {weekItems.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            handleWeekbar(index);
                        }}                       
                    >
                        <WeekItem
                            backgroundColor={
                                item.status
                                    ? theme.main.colors.green
                                    : theme.main.colors.white
                            }
                            borderColor={
                                item.status
                                    ? theme.main.colors.green
                                    : theme.main.colors.gray
                            }
                            >
                            {item.status ? (
                                <WhiteText fontSize={14}>{item.value}</WhiteText>
                            ) : (
                                <GrayText fontSize={14}>{item.value}</GrayText>
                            )}
                        </WeekItem>                      
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

export default Week;
