import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components';

export const Items = styled.View((props) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',  
    marginVertical: hp(3),  
}));

export const Item = styled.View((props) => ({
    width: wp(90),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center', 
    paddingHorizontal: wp(4),
    marginVertical: hp(1),
    backgroundColor: '#fff',

    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    opacity: 1,
    elevation: 2,
}));

export const TextContainer = styled.View((props) => ({
    height: hp(8),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',    
}));

export const VerticalLine = styled.View((props) => ({
    height: hp(8),
    borderColor: props.theme.main.colors.blue,
    borderLeftWidth: 1,
    marginLeft: wp(4),
    marginRight: wp(4)
}));

export const CalendarContainer = styled.View((props) => ({
    width: wp(86),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', 
    marginVertical: hp(1),
    marginLeft: 'auto',
    marginRight: 'auto'   
}));

