import React from 'react';
import IconTextBox_ from '../../RecycleComponents/IconTextBox_';
import {searchIcon} from '../../../icons/icons';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import useInput from '../../../hooks/useInput';
import ServerFolderList from './ServerFolderList';

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

const Resources = () => {
	const {t} = useTranslation('nav');
	const [search, onChangeSearch] = useInput('');

	return (
		<div>
			<_FormContainer>
				<_Form onSubmit={(e) => e.preventDefault()}>
					<IconTextBox_
						icon={searchIcon}
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
		</div>
	);
};

export default Resources;
