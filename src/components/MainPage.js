import React, {useCallback, useState} from 'react';

import {AddServerButton, Background} from '../styles/common';
import AddServerForm from './AddServerForm/AddServerForm';

const MainPage = () => {
	const [open, setOpen] = useState(false);

	const onClickVisibleForm = useCallback(() => {
		setOpen(true);
	}, []);

	return (
		<Background>
			<AddServerButton onClick={onClickVisibleForm}>
				Add Server
			</AddServerButton>
			<AddServerForm open={open} setOpen={setOpen} type='add' />
		</Background>
	);
};

export default MainPage;
