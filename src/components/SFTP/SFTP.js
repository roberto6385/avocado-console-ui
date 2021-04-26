import React, {useCallback} from 'react';
import {PropTypes} from 'prop-types';
import FileList from './FileList/FileList';
import History from './History/History';

import Edit from './Edit/Edit';
import {SftpContainer} from '../../styles/sftp';
import SplitPane, {Pane} from 'react-split-pane';
import {useSelector} from 'react-redux';

const SFTP_Component = ({uuid}) => {
	const {server} = useSelector((state) => state.sftp);
	const corServer = server.find((it) => it.uuid === uuid);
	const {mode} = corServer;

	const onChangeSize = useCallback((size) => {
		console.log(size);
	}, []);

	return (
		<SftpContainer>
			{mode === 'edit' ? (
				<Edit uuid={uuid} />
			) : (
				<SplitPane
					split='vertical'
					defaultSize={'75%'}
					onChange={onChangeSize}
				>
					{/*<Pane className={'sftp_container_pane'}>*/}
					<FileList uuid={uuid} />
					{/*</Pane>*/}
					{/*<Pane*/}
					{/*	className={'sftp_container_pane'}*/}
					{/*	style={{height: '100%'}}*/}
					{/*>*/}
					<History uuid={uuid} />
					{/*</Pane>*/}
				</SplitPane>
			)}
		</SftpContainer>
	);
};

SFTP_Component.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTP_Component;
