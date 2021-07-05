import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import {HEIGHT_48} from '../../../styles/length';
import {
	CHANGE_SORT_KEYWORD,
	INITIALIZING_HIGHLIGHT,
} from '../../../reducers/sftp/sftp';
import {borderColor, fontColor, tabColor} from '../../../styles/color';

const _Tr = styled.tr`
	top: 0px;
	height: ${HEIGHT_48};
	background: ${(props) => props?.back} !important;
	display: flex;
	align-items: center;
	padding-left: 16px;
	border-bottom: 1px solid;
	border-color: ${(props) => props.b_color};
	color: ${(props) => props.color};
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
	const {theme} = useSelector((state) => state.common);

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
			<_Tr
				back={tabColor[theme]}
				b_color={borderColor[theme]}
				color={fontColor[theme]}
			>
				{tableHeaders.map((item, i) => {
					return (
						<_Th
							key={item.key}
							id={`fileListTableHead_${item.key}`}
							// borderColor={
							// 	sortKeyword === item.key &&
							// 	`2px solid ${MAIN_COLOR}`
							// }
							textAlign={item.key === 'size' && 'right'}
							// back={sortKeyword === item.key && HIGHLIGHT_COLOR}
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
