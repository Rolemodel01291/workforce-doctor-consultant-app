import React from 'react'
import { injectReducer } from './index';

const withReducer = (key, reducer) => WrappedComponent => {
	injectReducer(key, reducer);

	return props => <WrappedComponent {...props} />;
};

export default withReducer;