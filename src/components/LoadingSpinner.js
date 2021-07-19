
import React from 'react';
import { StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ isLoading, text }) => {
    return (
        <Spinner
            visible={isLoading}
            textContent={text}
            textStyle={styles.spinnerTextStyle}
        />
    );
};

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF',
    },
});

LoadingSpinner.defaultProps = {
    text: 'Loading...',
};

LoadingSpinner.propTypes = {
    text: PropTypes.string,
};

export default LoadingSpinner;
