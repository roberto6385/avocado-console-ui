import React, {useCallback, useEffect} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import {dialogBoxAction, dialogBoxSelector} from '../../../reducers/dialogBoxs';
import {closeIcon} from '../../../icons/icons';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/button';

import {IconButton} from '../../../styles/components/icon';
import {
	DialogBox,
	DialogBoxFooter,
	DialogBoxHeader,
} from '../../../styles/components/disalogBox';
import {Form} from '../../../styles/components/form';
import {favoritesAction, favoritesSelector} from '../../../reducers/favorites';
import FavoriteItemTreeOnDialogBox from '../../Nav/Favorites/DialogBox/FavoriteItemTreeOnDialogBox';

const _DialogBox = styled(DialogBox)`
	width: 460px;
`;

const _Form = styled(Form)`
	height: 397px;
	border-radius: 4px;
	border: 1px solid
		${(props) =>
			props.theme.basic.pages.dialogBoxs.normalStyle.border.color};
	background: ${(props) =>
		props.theme.basic.pages.dialogBoxs.normalStyle.backgroundColor};
`;

const _ModalFooter = styled(DialogBoxFooter)`
	justify-content: space-between;
`;

const AddFavoritesDialogBox = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('addFavoritesForm');

	const {favoriteTreeOnDialogBox, favoriteTree} = useSelector(
		favoritesSelector.all,
	);
	const {form} = useSelector(dialogBoxSelector.all);

	const onClickCloseDialogBox = useCallback(async () => {
		await dispatch(dialogBoxAction.closeForm());
		dispatch(favoritesAction.setTempFavorite());
	}, [dispatch, favoriteTree, favoriteTreeOnDialogBox]);

	const onSubmitSaveChangesOnFavorites = useCallback(
		async (e) => {
			e.preventDefault();
			if (
				JSON.stringify(favoriteTreeOnDialogBox) !==
				JSON.stringify(favoriteTree)
			) {
				await dispatch(favoritesAction.setFavorite());
				await dispatch(dialogBoxAction.closeForm());
				dispatch(favoritesAction.setTempFavorite());
			} else {
				await dispatch(dialogBoxAction.closeForm());
				dispatch(favoritesAction.setTempFavorite());
			}
		},
		[dispatch, favoriteTree, favoriteTreeOnDialogBox],
	);

	const onClickAddFolderOnFavorites = useCallback(() => {
		dispatch(
			favoritesAction.addFavoriteOnDialogBox({name: t('newFolder')}),
		);
	}, [dispatch, t]);

	useEffect(() => {
		if (form.open && form.key === 'favorites') {
			dispatch(favoritesAction.initTempFavorite());
		}
	}, [form, dispatch]);

	return (
		<_DialogBox
			isOpen={form.open && form.key === 'favorites'}
			onRequestClose={onClickCloseDialogBox}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<DialogBoxHeader>
				<div>{t('title')}</div>
				<IconButton
					btype={'font'}
					onClick={onClickCloseDialogBox}
					size={'20px'}
					margin={'0px'}
				>
					{closeIcon}
				</IconButton>
			</DialogBoxHeader>

			<_Form onSubmit={onSubmitSaveChangesOnFavorites}>
				<FavoriteItemTreeOnDialogBox />
			</_Form>
			<_ModalFooter>
				<TransparentButton onClick={onClickAddFolderOnFavorites}>
					{t('newFolder')}
				</TransparentButton>
				<div>
					<TransparentButton onClick={onClickCloseDialogBox}>
						{t('cancel')}
					</TransparentButton>
					<NormalButton onClick={onSubmitSaveChangesOnFavorites}>
						{t('save')}
					</NormalButton>
				</div>
			</_ModalFooter>
		</_DialogBox>
	);
};

export default AddFavoritesDialogBox;
