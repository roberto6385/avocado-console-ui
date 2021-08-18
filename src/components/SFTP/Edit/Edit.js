import React from 'react';
import PropTypes from 'prop-types';
import EditToolbar from './EditToolbar';
import EditContent from './EditContent';
import styled from 'styled-components';

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

const Edit = ({uuid}) => {
	return (
		<_Container>
			<EditToolbar uuid={uuid} />
			<EditContent uuid={uuid} />
		</_Container>
	);
};

Edit.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default Edit;
