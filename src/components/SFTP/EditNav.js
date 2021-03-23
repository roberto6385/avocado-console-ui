import React from 'react';
import styled from 'styled-components';
import {MAIN_COLOR} from '../../styles/global';
import {MdCancel, MdFileDownload, MdSave} from 'react-icons/md';
import {SFTP_SAVE_CURRENT_MODE} from '../../reducers/sftp';
import {useDispatch, useSelector} from 'react-redux';
import {PropTypes} from 'prop-types';

const Navbar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	// padding: 6px 20px;
`;
const NavItem = styled.button`
	background: transparent;
	border: none;
	font-size: 18px;
	margin: 4px;
	padding: 2px;
	&:hover {
		color: ${MAIN_COLOR};
	}
`;

const EditNav = ({index, ws, uuid}) => {
	const dispatch = useDispatch();

	const editedFileDownload = () => {};
	const editedFileSave = () => {};

	const toNormalMode = () => {
		dispatch({type: SFTP_SAVE_CURRENT_MODE, data: {uuid, mode: 'normal'}});
	};

	return (
		<Navbar>
			<span style={{fontSize: '14px'}}>
				{/*{`${path === '/' ? path : `${path}/`}${curText?.name}`}*/}
				경로
			</span>
			<div style={{display: 'flex', alignItems: 'center'}}>
				<NavItem onClick={editedFileDownload}>
					<MdFileDownload />
				</NavItem>
				<NavItem onClick={editedFileSave}>
					<MdSave />
				</NavItem>
				<NavItem onClick={toNormalMode}>
					<MdCancel />
				</NavItem>
			</div>
			{/*<ContextModal*/}
			{/*	modalName="Close Editor"*/}
			{/*	show={openConfirmForm}*/}
			{/*	setShow={closeEditorConfirm}*/}
			{/*	uuid={uuid}*/}
			{/*	ws={ws}*/}
			{/*/>*/}
		</Navbar>
	);
};

EditNav.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default EditNav;
