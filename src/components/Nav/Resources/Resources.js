import React from 'react';
import IconSearchInput from '../../RecycleComponents/IconSearchInput';
import {searchIcon} from '../../../icons/icons';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import useInput from '../../../hooks/useInput';
import ServerFolderList from './ServerFolderList';
import AddServerDialogBox from '../../DialogBoxs/Form/AddServerDialogBox';

const _FormContainer = styled.div`
	padding: 10px 12px;
	display: flex;
`;

const _Form = styled.form`
	display: flex;
	flex: 1;
	align-items: center;
	border-radius: 4px;
`;

const Container = styled.div`
	height: 100%;
`;

const Resources = () => {
	const {t} = useTranslation('nav');
	const [search, onChangeSearch] = useInput('');

	return (
		<Container>
			<_FormContainer>
				<_Form onSubmit={(e) => e.preventDefault()}>
					<IconSearchInput
						onChange={onChangeSearch}
						value={search}
						place={t('search')}
						height={'36px'}
					/>
				</_Form>
				{/*<_AddButton onClick={onClickAddServer} >*/}
				{/*	{plusIcon}*/}
				{/*</_AddButton>*/}
			</_FormContainer>
			<ServerFolderList search={search} />
			<AddServerDialogBox />
		</Container>
	);
};

export default Resources;
