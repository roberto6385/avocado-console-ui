import React from 'react';
import {Collapse} from 'react-collapse';
import PropTypes from 'prop-types';
import styled from 'styled-components';
const Container = styled.div`
	.ReactCollapse--collapse {
		transition: height 0.3s;
	}
`;

const Collapse_Container = ({children, open}) => {
	return (
		<Container>
			<Collapse isOpened={open}>{children}</Collapse>
		</Container>
	);
};

Collapse_Container.propTypes = {
	children: PropTypes.element,
	open: PropTypes.bool,
};

export default Collapse_Container;
