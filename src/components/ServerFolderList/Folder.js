import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';
import {useDispatch, useSelector} from 'react-redux';
import Server from './Server';
import {
	ADD_FOLDER,
	CHANGE_SERVER_FOLDER_NAME,
	SET_CLICKED_SERVER,
	SORT_SERVER_AND_FOLDER,
} from '../../reducers/common';
import FolderContextMenu from '../ContextMenu/FolderContextMenu';
import useInput from '../../hooks/useInput';
import {
	GREEN_COLOR,
	IconButton,
	Span,
	AVOCADO_FONTSIZE,
	FOLDER_HEIGHT,
	IconContainer,
	MINT_COLOR,
	serverFolderBackColor,
	sideColor,
	fontColor,
	iconColor,
} from '../../styles/global';
import Collapse_ from '../RecycleComponents/Collapse_';
import styled from 'styled-components';
import {
	arrowDropDownIconMidium,
	arrowRightIconMidium,
	folderIconMidium,
	folderOpenIconMidium,
} from '../../icons/icons';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';

export const _NavItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: ${FOLDER_HEIGHT};
	padding: auto 16px;
	padding-left: ${(props) => props?.left};
	background-color: ${(props) => props.back};
	border-left: 2px solid;
	border-color: ${(props) => props.b_Color};
`;

export const _Form = styled.form`
	border: 1px solid ${GREEN_COLOR};
	display: flex;
	padding: 4px;
`;

export const _Input = styled.input`
	font-size: 14px;
	border: none;
	outline: none;
`;

const Folder = ({open, data, indent}) => {
	const dispatch = useDispatch();
	const {nav, clicked_server, theme, createdFolderInfo} = useSelector(
		(state) => state.common,
	);

	const renameRef = useRef(null);
	const [openTab, setOpenTab] = useState(false);
	const [openRename, setOpenRename] = useState(false);
	const [renameValue, onChangeRenameValue, setRenameValue] = useInput('');

	const onCLickFolder = useCallback(() => {
		if (clicked_server === data.key) {
			dispatch({type: SET_CLICKED_SERVER, data: null});
		} else {
			dispatch({type: SET_CLICKED_SERVER, data: data.key});
		}
	}, [clicked_server, data, dispatch]);

	const isValidFolderName = (folderArray, name) => {
		let pass = true;

		for (let i of folderArray) {
			if (i.type === 'folder') {
				if (i.name === name) return false;
				else if (i.contain.length > 0) {
					// eslint-disable-next-line no-unused-vars
					pass = pass && isValidFolderName(i.contain, name);
				}
			}
		}
		return pass;
	};

	const onClickOpen = useCallback(() => {
		setOpenTab(!openTab);
	}, [openTab]);

	const {show} = useContextMenu({
		id: data.key + 'folder',
	});

	const contextMenuOpen = useCallback(
		(e) => {
			e.preventDefault();
			dispatch({type: SET_CLICKED_SERVER, data: data.key});
			show(e);
		},
		[data, dispatch],
	);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
			if (renameValue === '') return;

			console.log(data.name);
			if (isValidFolderName(nav, renameValue.trim())) {
				dispatch({
					type: CHANGE_SERVER_FOLDER_NAME,
					data: {key: data.key, name: renameValue.trim()},
				});

				setOpenRename(false);
				dispatch({type: SET_CLICKED_SERVER, data: null});
			} else {
				console.log(renameValue);
				// 현재 중복이름으로 변경 후 esc가 아닌
				// 마우스 클릭으로 포커스를 변경하면 중복검사를 실행하는 문제있음
				if (renameValue !== data.name) {
					dispatch({
						type: OPEN_ALERT_POPUP,
						data: 'folder_name_duplicate',
					});
				} else {
					setOpenRename(false);
					dispatch({type: SET_CLICKED_SERVER, data: null});
				}
			}

			// if (renameValue !== data.name) {
			// 	dispatch({
			// 		type: CHANGE_SERVER_FOLDER_NAME,
			// 		data: {key: data.key, name: renameValue},
			// 	});
			// }
		},
		[data, renameValue],
	);

	const EscapeKey = useCallback(
		(e) => {
			if (e.keyCode === 27) {
				setOpenRename(false);
				dispatch({type: SET_CLICKED_SERVER, data: null});
			}
		},
		[dispatch],
	);

	const prevPutItem = useCallback(() => {
		dispatch({type: SET_CLICKED_SERVER, data: data.key});
	}, [data]);

	const nextPutItem = useCallback(
		(e) => {
			e.stopPropagation();

			data.type === 'folder' &&
				dispatch({
					type: SORT_SERVER_AND_FOLDER,
					data: {next: data, indent: parseInt(indent)},
				});
		},
		[data, indent],
	);

	const handleBlur = useCallback(() => {
		setOpenRename(false);
		renameRef.current = null;
		dispatch({type: SET_CLICKED_SERVER, data: null});
	}, [dispatch]);

	//when re-name form is open, fill in pre-value and focus and select it
	useEffect(() => {
		const fillInForm = async () => {
			if (openRename) {
				await setRenameValue(data.name);
				await renameRef.current?.focus();
				await renameRef.current?.select();
			}
		};
		fillInForm();
	}, [openRename, renameRef, data]);

	useEffect(() => {
		setOpenTab(open);
	}, [open]);

	useEffect(() => {
		if (data.key === clicked_server) {
			console.log(data);
			setOpenTab(true);
		}
		if (data === createdFolderInfo) {
			dispatch({type: SET_CLICKED_SERVER, data: createdFolderInfo.key});
			setOpenRename(true);
		}
	}, [createdFolderInfo]);

	return (
		<React.Fragment>
			<_NavItem
				onClick={onCLickFolder}
				draggable='true'
				onDragStart={prevPutItem}
				onDrop={nextPutItem}
				onContextMenu={contextMenuOpen}
				b_Color={
					clicked_server === data.key ? MINT_COLOR : sideColor[theme]
				}
				back={
					clicked_server === data.key
						? serverFolderBackColor[theme]
						: sideColor[theme]
				}
				left={(indent * 6 + 10).toString() + 'px'}
			>
				{clicked_server === data.key ? (
					<IconContainer
						margin={`0px 12px 0px 0px`}
						color={MINT_COLOR}
					>
						{folderIconMidium}
					</IconContainer>
				) : (
					<IconContainer
						color={iconColor[theme]}
						margin={`0px 12px 0px 0px`}
					>
						{folderOpenIconMidium}
					</IconContainer>
				)}
				{/*</Avocado_span>*/}
				<Span color={fontColor[theme]} flex={1} size={AVOCADO_FONTSIZE}>
					{openRename ? (
						<_Form onSubmit={handleSubmit} onBlur={handleSubmit}>
							<_Input
								ref={renameRef}
								type='text'
								value={renameValue}
								onChange={onChangeRenameValue}
								onKeyDown={EscapeKey}
								onBlur={handleBlur}
							/>
						</_Form>
					) : (
						data.name
					)}
				</Span>
				<IconButton onClick={onClickOpen}>
					{openTab ? arrowDropDownIconMidium : arrowRightIconMidium}
				</IconButton>
			</_NavItem>
			{data.contain.length !== 0 && (
				<Collapse_ open={openTab}>
					<React.Fragment>
						{data.contain.map((i) =>
							i.type === 'folder' ? (
								<Folder
									key={i.key}
									open={open}
									data={i}
									indent={indent + 1}
								/>
							) : (
								<Server
									key={i.key}
									data={i}
									indent={indent + 1}
								/>
							),
						)}
					</React.Fragment>
				</Collapse_>
			)}
			<FolderContextMenu data={data} setOpenRename={setOpenRename} />
		</React.Fragment>
	);
};

Folder.propTypes = {
	open: PropTypes.bool.isRequired,
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default Folder;
