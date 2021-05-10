import React, {useCallback, useEffect, useState} from 'react';
import * as PropTypes from 'prop-types';
import {CgMaximizeAlt, FiFile} from 'react-icons/all';
import {useSelector} from 'react-redux';

import SSHT from './SSHT';
import ConvertSFTP from '../SFTP/ConvertSFTP';
import Avocado_Dropdown from '../Avocado_Dropdown';
import {IconButton} from '../../styles/buttons';
import {MainHeader} from '../../styles/cards';
import SnippetsManeger from '../SnippetsManager';

const SSHTContainer = ({uuid, server_id}) => {
	const {snippets} = useSelector((state) => state.ssht);

	const [open, setOpen] = useState(true);
	const [column, setColumn] = useState([]);

	const onCLickFullScreen = useCallback(() => {
		document.getElementById('full_ssht_' + uuid).requestFullscreen();
	}, []);

	useEffect(() => {
		const temp = [
			{onClick: () => setOpen(true), title: 'Edit Snippets'},
			{title: 'divider'},
		];

		snippets.map((v) =>
			temp.push({onClick: () => console.log(v.content), title: v.name}),
		);
		setColumn(temp);
	}, [snippets]);

	return (
		<>
			<MainHeader>
				<Avocado_Dropdown icon={<FiFile />} menu={column} />
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
