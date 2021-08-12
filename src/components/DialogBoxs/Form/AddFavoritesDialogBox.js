import React, {useCallback, useEffect} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import {
	ADD_TEMP_FOLDER_ON_FAVORITES,
	INIT_TEMP_FAVORITES,
	SAVE_CHANGES_ON_FAVORITES,
	SET_TEMP_FAVORITES,
} from '../../../reducers/common';

import {DIALOG_BOX, dialogBoxAction} from '../../../reducers/dialogBoxs';
import {closeIcon} from '../../../icons/icons';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/button';

import {IconButton} from '../../../styles/components/icon';
import {
	ModalFooter,
	ModalHeader,
	DialogBox,
} from '../../../styles/components/disalogBox';
import {Form} from '../../../styles/components/form';
import FavoriteItemsTreeOnDialogBox from '../../Nav/Favorites/DialogBox/FavoriteItemsTreeOnDialogBox';

const _DialogBox = styled(DialogBox)`
	width: 460px;
`;

const _Form = styled(Form)`
	height: 397px;
`;

const ListContainer = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 4px;
	border: 1px solid
		${(props) =>
			props.theme.basic.pages.dialogBoxs.normalStyle.border.color};
	background: ${(props) =>
		props.theme.basic.pages.dialogBoxs.normalStyle.backgroundColor};
`;

const _ModalFooter = styled(ModalFooter)`
	justify-content: space-between;
`;

function searchNextNode(node) {
	let names = [];

	if (node.type === 'folder') {
		names.push(node.name);
		for (let x of node.contain) {
			let result = searchNextNode(x);
			names = names.concat(result);
		}
	}
	return names;
}

export function filterFolderNames(data) {
	let names = [];
	for (let x of data) {
		const result = searchNextNode(x);
		names = names.concat(result);
	}
	return names;
}

const isFolderNameDuplicated = (data) => {
	const names = filterFolderNames(data);
	console.log(names);

	if (names.filter((v, i) => names.indexOf(v) !== i).length === 0) {
		return false;
	}
	return true;
};

const AddFavoritesDialogBox = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('addFavoritesForm');

	const {tempFavorites, favorites} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const {form} = useSelector((state) => state[DIALOG_BOX], shallowEqual);

	const onClickCloseFavoritesDialogBox = useCallback(async () => {
		await dispatch(dialogBoxAction.closeForm());
		await dispatch({type: SET_TEMP_FAVORITES});
	}, [dispatch, favorites, tempFavorites]);

	const onSubmitSaveChangesOnFavorites = useCallback(
		async (e) => {
			e.preventDefault();
			if (JSON.stringify(tempFavorites) !== JSON.stringify(favorites)) {
				if (isFolderNameDuplicated(tempFavorites)) {
					await dispatch(
						dialogBoxAction.openAlert({
							key: 'folder_names_on_favorites_duplicated',
						}),
					);
				} else {
					await dispatch({type: SAVE_CHANGES_ON_FAVORITES});
					await dispatch(dialogBoxAction.closeForm());
					await dispatch({type: SET_TEMP_FAVORITES});
				}
			} else {
				await dispatch(dialogBoxAction.closeForm());
				await dispatch({type: SET_TEMP_FAVORITES});
			}
		},
		[dispatch, favorites, tempFavorites],
	);

	const onClickAddFolderOnFavorites = useCallback(() => {
		dispatch({
			type: ADD_TEMP_FOLDER_ON_FAVORITES,
			payload: {name: t('newFolder')},
		});
	}, [dispatch, t]);

	useEffect(() => {
		if (form.open && form.key === 'favorites') {
			dispatch({type: INIT_TEMP_FAVORITES});
		}
	}, [form, dispatch]);

	return (
		<_DialogBox
			isOpen={form.open && form.key === 'favorites'}
			onRequestClose={onClickCloseFavoritesDialogBox}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<ModalHeader>
				<div>{t('title')}</div>
				<IconButton
					btype={'font'}
					onClick={onClickCloseFavoritesDialogBox}
					size={'20px'}
					margin={'0px'}
				>
					{closeIcon}
				</IconButton>
			</ModalHeader>

			<_Form onSubmit={onSubmitSaveChangesOnFavorites}>
				<ListContainer>
					<FavoriteItemsTreeOnDialogBox />
				</ListContainer>
			</_Form>
			<_ModalFooter>
				<TransparentButton onClick={onClickAddFolderOnFavorites}>
					{t('newFolder')}
				</TransparentButton>
				<div>
					<TransparentButton onClick={onClickCloseFavoritesDialogBox}>
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
