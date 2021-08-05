import React, {useCallback} from 'react';
import {animation, Item, Menu} from 'react-contexify';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const _Menu = styled(Menu)`
	font-size: '14px';
`;

const HistoryContextMenu = ({uuid, highlight, setHighlight}) => {
	const contextDeleteHistory = useCallback(() => {
		// for (let value of highlight) {
		// 	dispatch({type: SFTP_DELETE_HISTORY, data: {id: value.id}});
		// }
		setHighlight([]);
	}, [setHighlight]);

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
		[contextDeleteHistory],
	);

	return (
		<_Menu id={'history'} animation={animation.slide}>
			<Item id='Delete' onClick={handleItemClick('Delete')}>
				Delete
			</Item>
		</_Menu>
	);
};

HistoryContextMenu.propTypes = {
	uuid: PropTypes.string.isRequired,
	highlight: PropTypes.array.isRequired,
	setHighlight: PropTypes.func.isRequired,
};

export default HistoryContextMenu;
