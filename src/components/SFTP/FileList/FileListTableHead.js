import React, {useCallback} from 'react';
import {HeaderTh, Th, Thead} from '../../../styles/tables';
import {CHANGE_SORT_KEYWORD} from '../../../reducers/sftp';
import {useDispatch, useSelector} from 'react-redux';
import * as PropTypes from 'prop-types';
import {light_Background, MAIN_COLOR} from '../../../styles/global';

const TableHead = ({uuid}) => {
	const dispatch = useDispatch();
	const {sftp} = useSelector((state) => state.sftp);
	const corServer = sftp.find((it) => it.uuid === uuid);
	const {sortKeyword} = corServer;

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
		{title: 'Size', key: 'size', min: '100px'},
		{title: 'Modified', key: 'modified', min: '260px'},
		{title: 'Permission', key: 'permission', min: '130px'},
	];

	return (
		<Thead>
			<tr style={{background: `${light_Background}`}}>
				{tableHeaders.map((item) => {
					return (
						<HeaderTh
							key={item.key}
							borderColor={
								sortKeyword === item.key &&
								`2px solid ${MAIN_COLOR}`
							}
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
			</tr>
		</Thead>
	);
};

TableHead.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default TableHead;
