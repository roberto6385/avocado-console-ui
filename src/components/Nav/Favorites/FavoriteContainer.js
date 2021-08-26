import React, {useCallback} from 'react';
import styled from 'styled-components';

import SearchIconTextBox from '../../RecycleComponents/SearchIconTextBox';
import {plusIcon, searchIcon} from '../../../icons/icons';
import useInput from '../../../hooks/useInput';
import {useTranslation} from 'react-i18next';
import FavoriteTree from './FavoriteTree';
import {useDispatch, useSelector} from 'react-redux';
import ChangeFavoritesDialogBox from '../../DialogBoxs/Form/ChangeFavoritesDialogBox';
import {dialogBoxAction} from '../../../reducers/dialogBoxs';
import {favoritesSelector} from '../../../reducers/favorites';

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

const Container = styled.div`
	height: 100%;
`;

const FavoriteContainer = () => {
	const {t} = useTranslation('nav');
	const dispatch = useDispatch();
	const {favoriteTree, favoriteGroups, favoriteGroupIndex} = useSelector(
		favoritesSelector.all,
	);

	const [search, onChangeSearch] = useInput('');

	const onClickOpenFavoritesDialogBox = useCallback(() => {
		// dispatch(dialogBoxAction.openAlert({key: 'developing'}));
		dispatch(dialogBoxAction.openForm({key: 'favorites'}));

		localStorage.setItem('tempFavoriteTree', JSON.stringify(favoriteTree));
		localStorage.setItem(
			'tempFavoriteGroups',
			JSON.stringify(favoriteGroups),
		);
		localStorage.setItem(
			'tempFavoriteGroupIndex',
			JSON.stringify(favoriteGroupIndex),
		);
		localStorage.setItem('tempSelectedFavorites', JSON.stringify([]));
		localStorage.setItem('tempFavoriteGroupRenamingKey', null);
	}, [dispatch, favoriteTree, favoriteGroups]);

	return (
		<Container>
			<_FormContainer>
				<_Form onSubmit={(e) => e.preventDefault()}>
					<SearchIconTextBox
						icon={searchIcon}
						onChange={onChangeSearch}
						value={search}
						placeholder={t('search')}
						height={'36px'}
					/>
				</_Form>
				<_AddButton onClick={onClickOpenFavoritesDialogBox}>
					{plusIcon}
				</_AddButton>
			</_FormContainer>
			<FavoriteTree searchVal={search} />
			<ChangeFavoritesDialogBox />
		</Container>
	);
};

export default FavoriteContainer;
