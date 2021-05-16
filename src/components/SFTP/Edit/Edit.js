import React from 'react';
import {PropTypes} from 'prop-types';
import EditNav from './EditNav';
import EditContents from './EditContents';
import styled from 'styled-components';
const Edit_Container = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;
const Edit = ({uuid}) => {
	return (
		<Edit_Container>
			<EditNav uuid={uuid} />
			<EditContents uuid={uuid} />
		</Edit_Container>
	);
};

Edit.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default Edit;
