import React from 'react';
import { theme } from '../app-config/theme';
import { Container, StarText } from '../layouts/components/RequireText';

const Component = (props) => {
    return (
        <Container>
            {props.children}
            <StarText>{` *`}</StarText>
        </Container>
    );
};

export default Component;
