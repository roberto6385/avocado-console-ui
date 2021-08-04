import React, {useCallback, useEffect, useMemo} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import {
	ADD_FAVORITES_FOLDER,
	LOCAL_SAVE_FAVORITES,
	SAVE_FAVORITES,
} from '../../reducers/common';
import useInput from '../../hooks/useInput';
import {
	CLOSE_ADD_FAVORITES_FORM_POPUP,
	OPEN_SAVE_POPUP,
} from '../../reducers/popup';
import {closeIcon} from '../../icons/icons';
import {borderColor, fontColor} from '../../styles/color';
import {NormalButton, TransparentButton} from '../../styles/components/button';
import FavoriteTempList from '../Nav/NavItems/FavoriteTempList';
import {IconButton} from '../../styles/components/icon';
import {
	ModalFooter,
	ModalHeader,
	PopupModal,
} from '../../styles/components/disalogBox';
import {Form} from '../../styles/components/form';

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

	border: 1px solid;
	border-radius: 4px;
	border-color: ${(props) => borderColor[props.theme_value]};
`;

const _ModalFooter = styled(ModalFooter)`
	justify-content: space-between;
`;

const AddFavoritesDialog = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('addFavoritesForm');

	const {tempFavorites, favorites, theme} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const {add_favorites_form_popup} = useSelector(
		(state) => state.popup,
		shallowEqual,
	);

	const [search, onChangeSearch] = useInput('');

	const closeModal = useCallback(() => {
		if (JSON.stringify(tempFavorites) !== JSON.stringify(favorites)) {
			dispatch({
				type: OPEN_SAVE_POPUP,
				data: {key: 'favorites_save'},
			});
		} else {
			dispatch({type: CLOSE_ADD_FAVORITES_FORM_POPUP});
		}
	}, [favorites, tempFavorites]);

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();
			if (JSON.stringify(tempFavorites) !== JSON.stringify(favorites)) {
				dispatch({type: SAVE_FAVORITES});
				dispatch({type: LOCAL_SAVE_FAVORITES});
			}
			// dispatch({type: CLOSE_ADD_FAVORITES_FORM_POPUP});
		},
		[dispatch, favorites, tempFavorites],
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
		while (!isValidFolderName(tempFavorites, folderName)) {
			folderName = `${t('newFolder')} ${i}`;
			i++;
		}
		dispatch({
			type: ADD_FAVORITES_FOLDER,
			data: {name: folderName, key: 'tempFavorites'},
		});
	}, [dispatch, tempFavorites, isValidFolderName, t]);

	useEffect(() => {
		if (add_favorites_form_popup.open) {
			console.log('open');
		}
	}, [add_favorites_form_popup]);

	return (
		<_PopupModal
			isOpen={add_favorites_form_popup.open}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
			theme_value={theme}
		>
			<ModalHeader theme_value={theme}>
				<div>{t('title')}</div>
				<IconButton
					theme_value={theme}
					onClick={closeModal}
					size={'20px'}
					margin={'0px'}
				>
					{closeIcon}
				</IconButton>
			</ModalHeader>

			<_Form onSubmit={onSubmitForm}>
				<ListContainer theme_value={theme}>
					<FavoriteTempList search={search} />
				</ListContainer>
			</_Form>
			<_ModalFooter theme_value={theme}>
				<TransparentButton
					theme_value={theme}
					onClick={newFolder}
					color={fontColor[theme]}
				>
					{t('newFolder')}
				</TransparentButton>
				<div>
					<TransparentButton
						theme_value={theme}
						onClick={closeModal}
						color={fontColor[theme]}
					>
						{t('cancel')}
					</TransparentButton>
					<NormalButton theme_value={theme} onClick={onSubmitForm}>
						{t('save')}
					</NormalButton>
				</div>
			</_ModalFooter>
		</_PopupModal>
	);
};

export default AddFavoritesDialog;