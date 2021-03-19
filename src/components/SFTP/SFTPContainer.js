import React, {useCallback} from 'react';
import {PropTypes} from 'prop-types';
import styled from 'styled-components';
import FileList from './FileList';
import History from './History';

const SftpContainer = styled.div`
	display: flex;
	height: 100%;
`;
const SFTPContainer = ({index, socket}) => {
	const onCLickChangeCurrentTab = useCallback(() => {
		// dispatch({type: CHANGE_CURRENT_TAB, data: id});
	}, []);

	return (
		<SftpContainer onClick={onCLickChangeCurrentTab}>
			<FileList index={index} socket={socket} />
			<History index={index} socket={socket} />
		</SftpContainer>
	);
};

SFTPContainer.propTypes = {
	index: PropTypes.number.isRequired,
	socket: PropTypes.object.isRequired,
};

export default SFTPContainer;
