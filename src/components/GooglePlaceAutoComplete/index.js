import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { theme } from '../../app-config/theme';
import { GooglePlacesAutocomplete } from './AutoComplete';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { View, Text } from 'react-native';
import { InputLabelText } from '../../layouts/globalLayout';

navigator.geolocation = require('@react-native-community/geolocation');

const GooglePlacesInput = ({
    currentLocation,
    onPress,
    currentAddress,
    width,
    height,
    type,
}) => {
    const ref = useRef();
    useEffect(() => {
        ref.current?.setAddressText(currentAddress);
    }, [currentAddress]);
    return (
        <View style={{
            width: wp(width),
        }}>
            <GooglePlacesAutocomplete
            ref={ref}
            // placeholder="Search"
            onPress={(data, details = null) => {
                onPress(data, details);
            }}
            query={{
                key: 'AIzaSyCm5E8fs58LjotTr6uDyglM7Th3MgAAXnI',
                language: 'en',
            }}
            fetchDetails={true}
            currentLocation={currentLocation}
            currentLocationLabel="Current location"
            styles={{
                textInput: {
                    height: hp(height),
                    borderBottomWidth: 1,
                    borderColor: theme.main.colors.gray,
                    fontSize: 16,
                    // backgroundColor: 'green',
                    borderWidth: type==='outline' ? 1 : 0,
                    borderRadius: type==='outline' ? 10 : 0
                },
            }}
        />
        </View>
    );
};

GooglePlacesInput.defaultProps = {
    currentAddress: '',
    currentLocation: false,
};

GooglePlacesInput.propTypes = {
    currentLocation: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    currentAddress: PropTypes.string,
};

export default GooglePlacesInput;
