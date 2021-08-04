import React, {useCallback} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import {HEIGHT_48} from '../../../styles/length';
import {
	CHANGE_SORT_KEYWORD,
	INITIALIZING_HIGHLIGHT,
} from '../../../reducers/sftp';
import {
	activeColor,
	borderColor,
	fontColor,
	tabColor,
} from '../../../styles/color';

const _Tr = styled.tr`
	top: 0px;
	height: ${HEIGHT_48};
	background: ${(props) =>
		props.theme.pages.webTerminal.main.panels.sftp.backgroundColor};
	display: flex;
	align-items: center;
	padding-left: 16px;
	border-bottom: 1px solid;
	border-color: ${(props) =>
		props.theme.pages.webTerminal.main.panels.sftp.border.color};
`;

const _Th = styled.th`
	margin-right: 16px;
	min-width: ${(props) => props?.min};
	flex: ${(props) => props.flex};
	border: none !important;
	text-align: ${(props) => props.textAlign || 'left'};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 2;
	color: ${(props) =>
		props.active &&
		props.theme.basic.pages.icons.dynamicIcons.selected.font.color};
`;

const _Thead = styled.thead`
	position: sticky;
	top: 0px;
	z-index: 1;
	min-width: 778px;
`;

const TableHead = ({uuid}) => {
	const {t} = useTranslation('fileListContents');
	const dispatch = useDispatch();
	const {etc: sftp_etcState} = useSelector(
		(state) => state.sftp,
		shallowEqual,
	);
	const corEtc = sftp_etcState.find((v) => v.uuid === uuid);
	const {sortKeyword} = corEtc;
	const Sorting = useCallback(
		(e) => {
			dispatch({type: INITIALIZING_HIGHLIGHT, payload: {uuid}});

			const {id} = e.target;

			switch (id) {
				case 'fileListTableHead_name':
					dispatch({
						type: CHANGE_SORT_KEYWORD,
						payload: {uuid, keyword: 'name'},
					});
					break;
				case 'fileListTableHead_size':
					dispatch({
						type: CHANGE_SORT_KEYWORD,
						payload: {uuid, keyword: 'size'},
					});
					break;
				case 'fileListTableHead_modified':
					dispatch({
						type: CHANGE_SORT_KEYWORD,
						payload: {uuid, keyword: 'modified'},
					});
					break;
				case 'fileListTableHead_permission':
					dispatch({
						type: CHANGE_SORT_KEYWORD,
						payload: {uuid, keyword: 'permission'},
					});
					break;
				default:
					break;
			}
		},
		[dispatch, uuid],
	);

	const tableHeaders = [
		{title: t('name'), key: 'name', min: '142px', flex: 1},
		{title: t('size'), key: 'size', min: '135px'},
		{title: t('modified'), key: 'modified', min: '212px'},
		{title: t('permission'), key: 'permission', min: '105px'},
		{title: '', key: '', min: '63px'},
	];

	return (
		<_Thead>
			<_Tr>
				{tableHeaders.map((item) => {
					return (
						<_Th
							key={item.key}
							id={`fileListTableHead_${item.key}`}
							active={sortKeyword === item.key}
							textAlign={item.key === 'size' && 'right'}
							onClick={Sorting}
							min={item.min}
							flex={item.flex}
						>
							{item.title}
						</_Th>
					);
				})}
			</_Tr>
		</_Thead>
	);
};

TableHead.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default TableHead;
