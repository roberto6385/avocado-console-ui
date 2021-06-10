import React, {useCallback} from 'react';
import {animation, Item, Menu} from 'react-contexify';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';

const HistoryContextMenu = ({uuid, highlight, setHighlight}) => {
	const dispatch = useDispatch();

	const contextDeleteHistory = useCallback(() => {
		// for (let value of highlight) {
		// 	dispatch({type: SFTP_DELETE_HISTORY, data: {id: value.id}});
		// }
		setHighlight([]);
	}, [highlight]);

	const handleItemClick = useCallback(
		(id) => () => {
			switch (id) {
				case 'Delete':
					contextDeleteHistory();
					break;
				default:
					return;
			}
		},
		[],
	);

	return (
		<Menu
			id={'history'}
			animation={animation.slide}
			style={{fontSize: '14px'}}
		>
			<Item id='Delete' onClick={handleItemClick('Delete')}>
				Delete
			</Item>
		</Menu>
	);
};

HistoryContextMenu.propTypes = {
	uuid: PropTypes.string.isRequired,
	highlight: PropTypes.array.isRequired,
	setHighlight: PropTypes.func.isRequired,
};

export default HistoryContextMenu;
