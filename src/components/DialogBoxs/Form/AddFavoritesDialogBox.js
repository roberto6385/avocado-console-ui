import React, {useCallback, useEffect} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import {
	ADD_FAVORITES_FOLDER,
	LOCAL_SAVE_FAVORITES,
	SAVE_FAVORITES,
} from '../../../reducers/common';
import useInput from '../../../hooks/useInput';
import {
	CLOSE_ADD_FAVORITES_DIALOG_BOX,
	OPEN_SAVE_DIALOG_BOX,
} from '../../../reducers/dialogBoxs';
import {closeIcon} from '../../../icons/icons';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/button';
import FavoriteTempList from '../../Nav/Favorites/FavoriteTempList';
import {IconButton} from '../../../styles/components/icon';
import {
	ModalFooter,
	ModalHeader,
	PopupModal,
} from '../../../styles/components/disalogBox';
import {Form} from '../../../styles/components/form';

const _PopupModal = styled(PopupModal)`
	z-index: 5;
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

const AddFavoritesDialogBox = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('addFavoritesForm');

	const {temp_favorites, favorites} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const {add_favorites_dialog_box} = useSelector(
		(state) => state.dialogBoxs,
		shallowEqual,
	);

	const [search, onChangeSearch] = useInput('');

	const closeModal = useCallback(() => {
		if (JSON.stringify(temp_favorites) !== JSON.stringify(favorites)) {
			dispatch({
				type: OPEN_SAVE_DIALOG_BOX,
				payload: {key: 'favorites_save'},
			});
		} else {
			dispatch({type: CLOSE_ADD_FAVORITES_DIALOG_BOX});
		}
	}, [favorites, temp_favorites]);

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();
			if (JSON.stringify(temp_favorites) !== JSON.stringify(favorites)) {
				dispatch({type: SAVE_FAVORITES});
				dispatch({type: LOCAL_SAVE_FAVORITES});
			}
			// dispatch({type: CLOSE_ADD_FAVORITES_DIALOG_BOX});
		},
		[dispatch, favorites, temp_favorites],
	);

	const isValidFolderName = useCallback((folderArray, name) => {
		let pass = true;

		for (let i of folderArray) {
			if (i.type === 'folder') {
				if (i.name === name) return false;
				else if (i.contain.length > 0) {
					pass = pass && isValidFolderName(i.contain, name);
				}
			}
		}
		return pass;
	}, []);

	const newFolder = useCallback(() => {
		let folderName = t('newFolder');
		let i = 0;
		while (!isValidFolderName(temp_favorites, folderName)) {
			folderName = `${t('newFolder')} ${i}`;
			i++;
		}
		dispatch({
			type: ADD_FAVORITES_FOLDER,
			payload: {name: folderName, key: 'temp_favorites'},
		});
	}, [dispatch, temp_favorites, isValidFolderName, t]);

	useEffect(() => {
		if (add_favorites_dialog_box.open) {
			console.log('open');
		}
	}, [add_favorites_dialog_box]);

	return (
		<_PopupModal
			isOpen={add_favorites_dialog_box.open}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<ModalHeader>
				<div>{t('title')}</div>
				<IconButton
					btype={'font'}
					onClick={closeModal}
					size={'20px'}
					margin={'0px'}
				>
					{closeIcon}
				</IconButton>
			</ModalHeader>

			<_Form onSubmit={onSubmitForm}>
				<ListContainer>
					<FavoriteTempList search={search} />
				</ListContainer>
			</_Form>
			<_ModalFooter>
				<TransparentButton onClick={newFolder}>
					{t('newFolder')}
				</TransparentButton>
				<div>
					<TransparentButton onClick={closeModal}>
						{t('cancel')}
					</TransparentButton>
					<NormalButton onClick={onSubmitForm}>
						{t('save')}
					</NormalButton>
				</div>
			</_ModalFooter>
		</_PopupModal>
	);
};

export default AddFavoritesDialogBox;
