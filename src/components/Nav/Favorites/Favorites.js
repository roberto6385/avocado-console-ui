import React, {useCallback} from 'react';
import styled from 'styled-components';

import IconSearchInput from '../../RecycleComponents/IconSearchInput';
import {plusIcon, searchIcon} from '../../../icons/icons';
import useInput from '../../../hooks/useInput';
import {useTranslation} from 'react-i18next';
import FavoriteItemsTree from './FavoriteItemsTree';
import {useDispatch} from 'react-redux';
import {OPEN_ADD_FAVORITES_DIALOG_BOX} from '../../../reducers/dialogBoxs';
import AddFavoritesDialogBox from '../../DialogBoxs/Form/AddFavoritesDialogBox';

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

const Favorites = () => {
	const {t} = useTranslation('nav');
	const dispatch = useDispatch();

	const [search, onChangeSearch] = useInput('');
	const newFavorites = useCallback(() => {
		dispatch({type: OPEN_ADD_FAVORITES_DIALOG_BOX});
	}, [dispatch]);

	return (
		<Container>
			<_FormContainer>
				<_Form onSubmit={(e) => e.preventDefault()}>
					<IconSearchInput
						icon={searchIcon}
						onChange={onChangeSearch}
						value={search}
						place={t('search')}
						height={'36px'}
					/>
				</_Form>
				<_AddButton onClick={newFavorites}>{plusIcon}</_AddButton>
			</_FormContainer>
			<FavoriteItemsTree search={search} />
			<AddFavoritesDialogBox />
		</Container>
	);
};

export default Favorites;
