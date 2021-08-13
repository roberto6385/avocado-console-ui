import React, {useCallback} from 'react';
import {animation, Item, Menu} from 'react-contexify';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const _Menu = styled(Menu)`
	font-size: '14px';
`;

const SFTPHistoryContextMenu = ({setHighlight}) => {
	const onClickDeleteSFTPHistory = useCallback(() => {
		setHighlight([]);
	}, [setHighlight]);

	const handleOnClickEvents = useCallback(
		(key) => () => {
			switch (key) {
				case 'delete':
					onClickDeleteSFTPHistory();
					break;
				default:
					return;
			}
		},
		[onClickDeleteSFTPHistory],
	);

	return (
		<_Menu id={'history'} animation={animation.slide}>
			<Item onClick={handleOnClickEvents('delete')}>Delete</Item>
		</_Menu>
	);
};

SFTPHistoryContextMenu.propTypes = {
	uuid: PropTypes.string.isRequired,
	highlight: PropTypes.array.isRequired,
	setHighlight: PropTypes.func.isRequired,
};

export default SFTPHistoryContextMenu;
