import React from 'react';
import {Collapse} from 'react-collapse';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const _Container = styled.div`
	.ReactCollapse--collapse {
		transition: height 0.3s;
	}
`;

const CollapseContainer = ({children, isOpened}) => {
	return (
		<_Container>
			<Collapse isOpened={isOpened}>{children}</Collapse>
		</_Container>
	);
};

CollapseContainer.propTypes = {
	children: PropTypes.element,
	isOpened: PropTypes.bool,
};

export default CollapseContainer;
