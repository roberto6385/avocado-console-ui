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
import {remoteResourceAction} from '../../../reducers/remoteResource';

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
		/*****************************************************/
		//  roberto - dialogLogout_update
		//
		/*****************************************************/
		localStorage.removeItem('tempSelectedFavoritesTree');
		localStorage.removeItem('tempSelectedFavoritesChildren');
		/*****************************************************/
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
		/*****************************************************/
		//  roberto - dialogLogout_update
		//
		/*****************************************************/
		localStorage.removeItem('tempSelectedFavoritesTree');
		/*****************************************************/
	}, []);

	const onClickAddFolderOnFavorites = useCallback(() => {
		console.log('click onClickAddFolderOnFavorites');
		//TODO: add folders
		// multiple adding is possible by duplication selection
		const tempFavoriteGroups = JSON.parse(
			localStorage.getItem('tempFavoriteGroups'),
		);
		console.log('tempFavoriteGroups?:', tempFavoriteGroups);

		dispatch(
			favoritesAction.addFavoriteGroup({
				id: 'f_10',
				name: t('addFolder'),
			}),
		);

		// const newTempFavoriteGroups = tempFavoriteGroups.push({
		// 	id: 'f_6',
		// 	name: 'ㅈㅇㅈㅇㅈㅇ',
		// 	data: {},
		// });
		console.log('tempFavoriteGroups?:', tempFavoriteGroups);
		//
		// console.log('newTempFavoriteGroups??:', newTempFavoriteGroups);
		localStorage.setItem(
			'tempFavoriteGroups',
			JSON.stringify(tempFavoriteGroups),
		);
	}, [dispatch, t]);
	/*****************************************************/
	//  roberto - dialogLogout_update
	//
	// delete 클릭시 실행 함수
	/*****************************************************/

	// useEffect(() => {
	//
	//
	// 	);	}, [tempFavoriteTree];

	const onClickDeleteFolderOnFavorites = useCallback(async () => {
		alert('onClickDeleteFolderOnFavorites clcick');
		let tempSelectedFavorites = JSON.parse(
			localStorage.getItem('tempSelectedFavorites'),
		);
		let tempSelectedFavoritesTree = JSON.parse(
			localStorage.getItem('tempSelectedFavoritesTree'),
		);
		let tempSelectedFavoritesChildren = JSON.parse(
			localStorage.getItem('tempSelectedFavoritesChildren'),
		);

		let tempFavoriteTree = JSON.parse(
			localStorage.getItem('tempFavoriteTree'),
		);

		console.log(' 지워야할 정보 tempFavoriteTree', tempFavoriteTree);

		if (
			tempSelectedFavorites.length &&
			tempSelectedFavoritesChildren.length
		) {
			console.log(
				'in tempSelectedFavorites && tempSelectedFavoritesChildren',
			);

			//tempSelectedFavorites 검색
			tempFavoriteTree.map((data, index) => {
				tempSelectedFavorites.filter((v) => {
					if (data.id.includes(v)) {
						tempFavoriteTree.splice(index, 1);
					}
				});
			});
			localStorage.setItem(
				'tempFavoriteTree',
				JSON.stringify(tempFavoriteTree),
			);

			tempFavoriteTree.map((data, index) => {
				console.log(data, index);
				if (data) {
					tempSelectedFavoritesChildren.filter((v) => {
						if (data.chidren[index].id.includes(v)) {
							delete tempFavoriteTree[index].children(index, 1);
						}
					});
				}
			});
			localStorage.setItem(
				'tempFavoriteTree',
				JSON.stringify(tempFavoriteTree),
			);

			//tempSelectedFavoritesTree 검색
			// tempFavoriteTree.map((data) => {
			// 	tempSelectedFavoritesTree.filter((v) => {
			// 		data.children.filter((s) => {
			// 			if (s.id.includes(v)) {
			// 				console.log('일치데이터 child 삭제:', s);
			// 			}
			// 		});
			// 	});
			// });
		} else if (tempSelectedFavorites.length) {
			console.log('in tempSelectedFavorites');
			// tree id 삭제
			tempFavoriteTree.map((data, index) => {
				tempSelectedFavorites.filter((v) => {
					if (data.id.includes(v)) {
						tempFavoriteTree.splice(index, 1);
					}
				});
			});
			localStorage.setItem(
				'tempFavoriteTree',
				JSON.stringify(tempFavoriteTree),
			);
		} else {
			console.log('in tempSelectedFavoritesChildren');
			// tree id 의 children 삭제
			tempFavoriteTree.map((data, index) => {
				console.log(data, index);
				if (data) {
					tempSelectedFavoritesChildren.filter((v) => {
						data.children.map((s, index2) => {
							if (s.id.includes(v)) {
								delete tempFavoriteTree[index].children.splice(
									index2,
									1,
								);
							}
						});
					});
				}
			});
			localStorage.setItem(
				'tempFavoriteTree',
				JSON.stringify(tempFavoriteTree),
			);
		}

		// console.log('in tempSelectedFavoritesChildren');
		// // tree id 의 children 삭제
		// tempFavoriteTree.map((data, index) => {
		// 	console.log(data, index);
		// 	if (data) {
		// 		tempSelectedFavoritesChildren.filter((v) => {
		// 			console.log('?:', data.children, index);
		//
		//
		// 				if (data.chidren[index].id.includes(v)) {
		// 				delete tempFavoriteTree[index].children(index, 1);
		// 			}
		// 		});
		// 	}
		// });
		// localStorage.setItem(
		// 	'tempFavoriteTree',
		// 	JSON.stringify(tempFavoriteTree),
		// );

		// await dispatch(
		// 	dialogBoxAction.openAlert({
		// 		key: 'delete-favorite-group',
		// 		id: 1,
		// 	}),
		// );
	}, []);
	/*****************************************************/

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
