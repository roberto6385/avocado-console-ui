import React, {useCallback, useEffect, useMemo} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import {
	ADD_FAVORITES_FOLDER,
	ADD_FOLDER,
	CHANGE_IDENTITY_CHECKED,
	CHANGE_PROTOCOL,
	EDIT_SERVER,
	SAVE_FAVORITES,
	SAVE_SERVER,
} from '../../reducers/common';
import useInput from '../../hooks/useInput';
import {GetMessage} from '../../ws/ssht_ws_logic';
import {ssht_ws_request} from '../../ws/ssht_ws_request';
import {
	CLOSE_ADD_FAVORITES_FORM_POPUP,
	CLOSE_ADD_SERVER_FORM_POPUP,
	OPEN_ALERT_POPUP,
	OPEN_SAVE_POPUP,
} from '../../reducers/popup';
import InputFiled_ from '../RecycleComponents/InputFiled_';
import Select_ from '../RecycleComponents/Select_';
import {closeIcon} from '../../icons/icons';
import {
	Form,
	Input,
	ModalFooter,
	ModalHeader,
	PopupModal,
} from '../../styles/default';
import {
	borderColor,
	fontColor,
	greyNormalButtonBackgroundColor,
} from '../../styles/color';
import {
	ClickableIconButton,
	PrimaryGreenButton,
	PrimaryGreyButton,
	SecondaryGreenButton,
} from '../../styles/button';
import FavoriteList from '../ServerFolderList/FavoritesList';
import FavoriteTempList from '../ServerFolderList/FavoritesTempList';

const _PopupModal = styled(PopupModal)`
	z-index: 5;
	width: 562px;
`;

const _Input = styled(Input)`
	width: '178px';
`;

const _SecondaryGreenButton = styled(SecondaryGreenButton)`
	margin: 10px 8px 0px 8px;
`;

const _FileInput = styled.input`
	display: none;
	border: 1px solid;
	border-color: ${(props) => props?.b_color};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const _InputFiled = styled(InputFiled_)`
	margin-right: 16px;
`;

const _Label = styled.label`
	width: 100%;
	height: '34px'
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${(props) => props.b_color};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
	margin: 0;
	cursor: pointer;
`;

const _ItemContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
const _SecondItem = styled.div`
	margin-left: 16px;
`;

const _Form = styled(Form)`
	height: 395px;
`;

const ListContainer = styled.div`
	width: 100%;
	height: 100%;

	border: 1px solid;
	border-radius: 4px;
	border-color: ${(props) => borderColor[props.theme_value]};
`;

const isValidHostname = (host) => {
	if (
		/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
			host,
		)
	)
		return true;
	return false;
};

const _ModalFooter = styled(ModalFooter)`
	justify-content: space-between;
`;

const duplicationTest = (server, name, host, port, protocol) => {
	const nameArray = server.filter((v) => name === v.name);
	//name 제외
	if (nameArray.length > 0) return false;
	//host, port, protocol
	const hostArray = server.filter((v) => host === v.host);
	for (let i of hostArray) {
		if (i.port === port && i.protocol === protocol) return false;
	}
	return true;
};

const AddFavoritesForm = () => {
	const {t} = useTranslation('addFavoritesForm');
	const dispatch = useDispatch();
	const {tempFavorites, favorites, theme} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const [search, onChangeSearch] = useInput('');

	const add_favorites_form_popup = useSelector(
		(state) => state.popup.add_favorites_form_popup,
	);

	const closeModal = useCallback(() => {
		if (JSON.stringify(tempFavorites) !== JSON.stringify(favorites)) {
			dispatch({
				type: OPEN_SAVE_POPUP,
				data: {key: 'favorites_save'},
			});
		} else {
			dispatch({type: CLOSE_ADD_FAVORITES_FORM_POPUP});
		}
	}, [dispatch, favorites, tempFavorites]);

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();
			if (JSON.stringify(tempFavorites) !== JSON.stringify(favorites)) {
				dispatch({type: SAVE_FAVORITES});
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
		dispatch({type: ADD_FAVORITES_FOLDER, data: folderName});
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
				<ClickableIconButton
					onClick={closeModal}
					color={fontColor[theme]}
					size={'20px'}
					margin={'0px'}
				>
					{closeIcon}
				</ClickableIconButton>
			</ModalHeader>

			<_Form onSubmit={onSubmitForm}>
				<ListContainer theme_value={theme}>
					<FavoriteTempList search={search} />
				</ListContainer>
			</_Form>
			<_ModalFooter theme_value={theme}>
				<PrimaryGreyButton
					theme_value={theme}
					onClick={newFolder}
					color={fontColor[theme]}
				>
					{t('newFolder')}
				</PrimaryGreyButton>
				<div>
					<PrimaryGreyButton
						theme_value={theme}
						onClick={closeModal}
						color={fontColor[theme]}
					>
						{t('cancel')}
					</PrimaryGreyButton>
					<PrimaryGreenButton
						theme_value={theme}
						onClick={onSubmitForm}
					>
						{t('save')}
					</PrimaryGreenButton>
				</div>
			</_ModalFooter>
		</_PopupModal>
	);
};

export default AddFavoritesForm;
