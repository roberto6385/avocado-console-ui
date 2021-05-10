import React, {useCallback, useState} from 'react';
import * as PropTypes from 'prop-types';
import {CgMaximizeAlt, FiFile} from 'react-icons/all';

import SSHT from './SSHT';
import ConvertSFTP from '../SFTP/ConvertSFTP';
import Avocado_Dropdown from '../Avocado_Dropdown';
import {IconButton} from '../../styles/buttons';
import {MainHeader} from '../../styles/cards';
import SnippetsManeger from '../SnippetsManager';

const SSHTContainer = ({uuid, server_id}) => {
	const [open, setOpen] = useState(true);

	const onCLickFullScreen = useCallback(() => {
		document.getElementById('full_ssht_' + uuid).requestFullscreen();
	}, []);

	const column_list = [
		{onClick: () => setOpen(true), title: 'Edit Snippets'},
		{
			onClick: () => console.log('5 Columns'),
			title: 'Find large files on Linux',
		},
		{onClick: () => console.log('5 Columns'), title: 'Display disk usege'},
		{onClick: () => console.log('5 Columns'), title: 'Extract tar file'},
		{title: 'divider'},
		{
			onClick: () => console.log('5 Columns'),
			title: 'View running processes',
		},
	];

	return (
		<>
			<MainHeader>
				<Avocado_Dropdown icon={<FiFile />} menu={column_list} />
				<IconButton>
					<CgMaximizeAlt onClick={onCLickFullScreen} />
				</IconButton>
				<ConvertSFTP server_id={server_id} />
			</MainHeader>
			<SSHT id={`full_ssht_${uuid}`} uuid={uuid} />
			<SnippetsManeger setOpen={setOpen} open={open} />
		</>
	);
};

SSHTContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
	server_id: PropTypes.number.isRequired,
};

export default SSHTContainer;
