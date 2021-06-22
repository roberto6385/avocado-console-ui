import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
	ADD_HISTORY,
	commandWriteAction,
	PUSH_WRITE_LIST,
} from '../../../reducers/sftp';
import {OPEN_WARNING_ALERT_POPUP} from '../../../reducers/popup';
import styled from 'styled-components';
import {Span, IconButton} from '../../../styles/global';
import {deleteIcon, fileUploadIcon} from '../../../icons/icons';
import {HEIGHT_50} from '../../../styles/length';
import {
	borderColor,
	fontColor,
	iconColor,
	tabColor,
} from '../../../styles/color';

const _Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0px 16px;
	height: ${HEIGHT_50};
	border-bottom: 1px solid;
	border-color: ${(props) => props.bcolor};
	background: ${(props) => props.back};
`;

const HistoryNav = ({uuid}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('historyNav');
	const {sftp} = useSelector((state) => state.sftp);
	const {theme} = useSelector((state) => state.common);
	const corServer = useMemo(() => sftp.find((it) => it.uuid === uuid), [
		sftp,
		uuid,
	]);
	const {history_highlight, path} = corServer;

	const upload = useCallback(async () => {
		const uploadInput = document.createElement('input');
		document.body.appendChild(uploadInput);
		uploadInput.setAttribute('type', 'file');
		uploadInput.setAttribute('multiple', 'multiple');
		uploadInput.setAttribute('style', 'display:none');
		uploadInput.click();
		uploadInput.onchange = async (e) => {
			const files = e.target.files;

			const array = [];
			for await (let value of files) {
				array.push({path, file: value});
			}
			dispatch({type: PUSH_WRITE_LIST, payload: {uuid, array}});
		};
		document.body.removeChild(uploadInput);
	}, [corServer]);

	const historyDelete = useCallback(() => {
		if (history_highlight.length === 0) {
			//
		} else {
			dispatch({
				type: OPEN_WARNING_ALERT_POPUP,
				data: {key: 'sftp_delete_history', uuid: uuid},
			});
		}
	}, [history_highlight, uuid, dispatch]);

	return (
		<_Container back={tabColor[theme]} bcolor={borderColor[theme]}>
			<Span color={fontColor[theme]}>{t('title')}</Span>
			<div>
				<IconButton color={iconColor[theme]} onClick={upload}>
					{fileUploadIcon()}
				</IconButton>
				<IconButton
					color={iconColor[theme]}
					className={'history_contents'}
					onClick={historyDelete}
				>
					{deleteIcon}
				</IconButton>
			</div>
		</_Container>
	);
};

HistoryNav.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default HistoryNav;
