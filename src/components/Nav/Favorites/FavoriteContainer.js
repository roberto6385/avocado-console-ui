import React, {useCallback} from 'react';
import styled from 'styled-components';

import SearchIconTextBox from '../../RecycleComponents/SearchIconTextBox';
import {plusIcon, searchIcon} from '../../../icons/icons';
import useInput from '../../../hooks/useInput';
import {useTranslation} from 'react-i18next';
import FavoriteTree from './FavoriteTree';
import {useDispatch} from 'react-redux';
import AddFavoritesDialogBox from '../../DialogBoxs/Form/AddFavoritesDialogBox';
import {dialogBoxAction} from '../../../reducers/dialogBoxs';

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

	const [search, onChangeSearch] = useInput('');
	const newFavorites = useCallback(() => {
		dispatch(dialogBoxAction.openForm({key: 'favorites'}));
	}, [dispatch]);

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
				<_AddButton onClick={newFavorites}>{plusIcon}</_AddButton>
			</_FormContainer>
			<FavoriteTree searchVal={search} />
			<AddFavoritesDialogBox />
		</Container>
	);
};

export default FavoriteContainer;
