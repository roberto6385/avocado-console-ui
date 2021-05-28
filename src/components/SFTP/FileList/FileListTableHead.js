import React, {useCallback} from 'react';
import {CHANGE_SORT_KEYWORD} from '../../../reducers/sftp';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
	backColor,
	borderColor,
	fontColor,
	THIRD_HEIGHT,
} from '../../../styles/global';

const _Tr = styled.tr`
	height: ${THIRD_HEIGHT};
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
	const dispatch = useDispatch();
	const {theme} = useSelector((state) => state.common);

	const Sorting = useCallback(
		(e) => {
			const {innerText} = e.target;
			switch (innerText) {
				case 'Name':
					dispatch({
						type: CHANGE_SORT_KEYWORD,
						payload: {uuid, keyword: 'name'},
					});
					break;
				case 'Size':
					dispatch({
						type: CHANGE_SORT_KEYWORD,
						payload: {uuid, keyword: 'size'},
					});
					break;
				case 'Modified':
					dispatch({
						type: CHANGE_SORT_KEYWORD,
						payload: {uuid, keyword: 'modified'},
					});
					break;
				case 'Permission':
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
		{title: 'Name', key: 'name', min: '150px', flex: 1},
		{title: 'Size', key: 'size', min: '135px'},
		{title: 'Modified', key: 'modified', min: '212px'},
		{title: 'Permission', key: 'permission', min: '105px'},
	];

	return (
		<_Thead>
			<_Tr
				back={backColor[theme]}
				b_color={borderColor[theme]}
				color={fontColor[theme]}
			>
				{tableHeaders.map((item) => {
					return (
						<HeaderTh
							key={item.key}
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
