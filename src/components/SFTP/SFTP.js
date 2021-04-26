import React, {useCallback} from 'react';
import {PropTypes} from 'prop-types';
import FileList from './FileList/FileList';
import History from './History/History';

import Edit from './Edit/Edit';
import {SftpContainer} from '../../styles/sftp';
import SplitPane, {Pane} from 'react-split-pane';

const SFTP_Component = ({server}) => {
	const {mode} = server;

	const onChangeSize = useCallback((size) => {
		console.log(size);
	}, []);

	return (
		<SftpContainer>
			{mode === 'edit' ? (
				<Edit server={server} />
			) : (
				<SplitPane
					split='vertical'
					defaultSize={'75%'}
					onChange={onChangeSize}
				>
					<Pane className={'sftp_container_pane'}>
						<FileList server={server} />
					</Pane>
					<Pane
						className={'sftp_container_pane'}
						style={{height: '100%'}}
					>
						<History server={server} />
					</Pane>
				</SplitPane>
			)}
		</SftpContainer>
	);
};

SFTP_Component.propTypes = {
	server: PropTypes.object.isRequired,
};

export default SFTP_Component;
