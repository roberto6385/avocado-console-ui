import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import {borderColor, fontColor, sideColor} from '../../../styles/global';
import {HEIGHT_48} from '../../../styles/length';
import {CHANGE_SORT_KEYWORD} from '../../../reducers/sftp';

const _Tr = styled.tr`
	height: ${HEIGHT_48};
	background: ${(props) => props?.back} !important;
	display: flex;
	align-items: center;
	padding: 8px;
	border-bottom: 1px solid;
	border-color: ${(props) => props.b_color};
	color: ${(props) => props.color};
`;

const HeaderTh = styled.th`
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
	min-width: 718px;
	tr {
		display: flex;
		top: 0px;
		background: white;
		th {
			padding: 8px !important;
		}
	}
`;

const Th = styled.th`
	display: flex;
	align-items: center;
	min-width: ${(props) => props?.min};
	flex: ${(props) => props.flex};
	justify-content: ${(props) => props.justify || 'flex-start'};
	white-space: nowrap;
	border: none !important;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const TableHead = ({uuid}) => {
	const {t} = useTranslation('fileListContents');
	const dispatch = useDispatch();
	const {theme} = useSelector((state) => state.common);

	const Sorting = useCallback(
		(e) => {
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
		{title: t('name'), key: 'name', min: '150px', flex: 1},
		{title: t('size'), key: 'size', min: '135px'},
		{title: t('modified'), key: 'modified', min: '212px'},
		{title: t('permission'), key: 'permission', min: '105px'},
	];

	return (
		<_Thead>
			<_Tr
				back={sideColor[theme]}
				b_color={borderColor[theme]}
				color={fontColor[theme]}
			>
				{tableHeaders.map((item) => {
					return (
						<HeaderTh
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
						</HeaderTh>
					);
				})}
				<Th min={'100px'} />
			</_Tr>
		</_Thead>
	);
};

TableHead.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default TableHead;
