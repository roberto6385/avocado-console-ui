import React, {useCallback} from 'react';
import IconTextBox_ from '../../RecycleComponents/IconTextBox_';
import {plusIcon, searchIcon} from '../../../icons/icons';
import ServerFolderList from '../Resources/ServerFolderList';
import styled from 'styled-components';
import useInput from '../../../hooks/useInput';
import {useTranslation} from 'react-i18next';
import FavoriteList from './FavoriteList';
import {OPEN_ADD_FAVORITES_FORM_POPUP} from '../../../reducers/popup';
import {useDispatch} from 'react-redux';

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

const _AddButton = styled.button`
	width: 36px;
	height: 36px;
	margin-left: 8px;
	border: 1px solid;
	border-radius: 4px;
	color: ${(props) =>
		props.theme.pages.webTerminal.main.navigation.addButton.font.color};
	border-color: ${(props) =>
		props.theme.pages.webTerminal.main.navigation.addButton.border.color};
	background: ${(props) =>
		props.theme.pages.webTerminal.main.navigation.addButton
			.backgroundColor};

	&:hover {
		color: ${(props) =>
			props.theme.pages.webTerminal.main.navigation.addButton.hover.font
				.color};
		border-color: ${(props) =>
			props.theme.pages.webTerminal.main.navigation.addButton.hover.border
				.color};
		background: ${(props) =>
			props.theme.pages.webTerminal.main.navigation.addButton.hover
				.backgroundColor};
	}
`;

const Favorites = () => {
	const {t} = useTranslation('nav');
	const dispatch = useDispatch();

	const [search, onChangeSearch] = useInput('');
	const newFavorites = useCallback(() => {
		dispatch({type: OPEN_ADD_FAVORITES_FORM_POPUP});
	}, [dispatch]);

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
				<_AddButton onClick={newFavorites}>{plusIcon}</_AddButton>
			</_FormContainer>
			<FavoriteList search={search} />
		</div>
	);
};

export default Favorites;
