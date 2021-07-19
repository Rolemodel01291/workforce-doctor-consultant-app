import React from 'react';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';
import { theme } from '../app-config/theme';
import { LocaleConfig } from 'react-native-calendars';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ShadowContainer } from '../layouts/components/Calendar';

const CustomCalendar = (props) => {
    LocaleConfig.locales['fr'] = {
        monthNames: [
            'Janvier',
            'Février',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Août',
            'Septembre',
            'Octobre',
            'Novembre',
            'Décembre',
        ],
        monthNamesShort: [
            'Janv.',
            'Févr.',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juil.',
            'Août',
            'Sept.',
            'Oct.',
            'Nov.',
            'Déc.',
        ],
        dayNames: [
            'Dimanche',
            'Lundi',
            'Mardi',
            'Mercredi',
            'Jeudi',
            'Vendredi',
            'Samedi',
        ],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        today: "Aujourd'hui",
    };
    LocaleConfig.defaultLocale = 'fr';

    return (
        <ShadowContainer>
            <Calendar
                // Initially visible month. Default = Date()
                current={props.currentDate}
                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                // minDate={new Date()}
                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                maxDate={'2050-05-30'}
                // Handler which gets executed on day press. Default = undefined
                onDayPress={(day) => {
                    props.onDayPress(day.dateString);
                    // console.log(day)
                }}
                // Handler which gets executed on day long press. Default = undefined
                onDayLongPress={(day) => {
                    // console.log('selected day', day);
                }}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'yyyy MM DD'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={(month) => {
                    // console.log('month changed', month);
                }}
                markedDates={{
                    [props.currentDate]: {
                        selected: true,
                        disableTouchEvent: true,
                        selectedColor: 'green',
                        selectedTextColor: 'white',
                    },
                    ...props.markedDate,
                }}
                firstDay={1}
                showWeekNumbers={true}
                renderHeader={(date) => {
                    /*Return JSX*/
                }}
                style={{ width: wp(90) }}
            />
        </ShadowContainer>
    );
};

export default CustomCalendar;
