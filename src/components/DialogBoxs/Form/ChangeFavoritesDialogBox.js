import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
import {favoritesAction} from '../../../reducers/favorites';
import FavoriteTreeOnDialogBox from '../../Nav/Favorites/DialogBox/FavoriteTreeOnDialogBox';

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

const ChangeFavoritesDialogBox = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('changeFavoritesDialogBox');

	const {form} = useSelector(dialogBoxSelector.all);

	const onClickCloseDialogBox = useCallback(async () => {
		await dispatch(dialogBoxAction.closeForm());
		localStorage.removeItem('tempFavoriteTree');
		localStorage.removeItem('tempFavoriteGroups');
		localStorage.removeItem('tempFavoriteGroupIndex');
		localStorage.removeItem('tempSelectedFavorites');
		localStorage.removeItem('tempFavoriteGroupRenamingKey');
	}, [dispatch]);

	const onSubmitSaveChangesOnFavorites = useCallback(async (e) => {
		e.preventDefault();
		//TODO: tempFavorite Tree(Local Storeage)와 Favorite Tree를 비교후 변화가 있으면 dispath로 반영
		//TODO: close form
		await dispatch(dialogBoxAction.closeForm());
		//TODO: Local Storeage tempFavorie 제거
		localStorage.removeItem('tempFavoriteTree');
		localStorage.removeItem('tempFavoriteGroups');
		localStorage.removeItem('tempFavoriteGroupIndex');
		localStorage.removeItem('tempSelectedFavorites');
		localStorage.removeItem('tempFavoriteGroupRenamingKey');
	}, []);

	const onClickAddFolderOnFavorites = useCallback(() => {
		//TODO: add folders
		// multiple adding is possible by duplication selection
	}, [dispatch, t]);

	const onClickDeleteFolderOnFavorites = useCallback(() => {}, []);

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
				<FavoriteTreeOnDialogBox />
			</_Form>
			<_ModalFooter>
				<TransparentButton onClick={onClickAddFolderOnFavorites}>
					{t('addFolder')}
				</TransparentButton>
				<TransparentButton onClick={onClickDeleteFolderOnFavorites}>
					Delete
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

export default ChangeFavoritesDialogBox;
