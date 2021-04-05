import React, {useCallback, useState} from 'react';
import * as PropTypes from 'prop-types';

import {Collapse} from 'react-bootstrap';
import {IconButton, ServerNavItem} from '../../styles/common';
import {
	MdKeyboardArrowDown,
	MdKeyboardArrowRight,
	RiFolder2Line,
} from 'react-icons/all';
import Server from './Server';
import {SET_CLICKED_SERVER} from '../../reducers/common';
import {useDispatch, useSelector} from 'react-redux';
import {HIGHLIGHT_COLOR} from '../../styles/global';
import {useDoubleClick} from '../../hooks/useDoubleClick';

const Folder = ({data}) => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const {clicked_server, server, me} = useSelector((state) => state.common);

	const onHybridClick = useDoubleClick(
		() => {
			console.log('뭔가 하긋지?');
		},
		() => {
			if (clicked_server === data.key)
				dispatch({type: SET_CLICKED_SERVER, data: null});
			else dispatch({type: SET_CLICKED_SERVER, data: data.key});
		},
	);

	const onClickOpen = useCallback(() => {
		setOpen(!open);
	}, [open]);

	return (
		<div>
			<ServerNavItem
				onClick={onHybridClick}
				back={clicked_server === data.key ? HIGHLIGHT_COLOR : 'white'}
			>
				<RiFolder2Line />
				{data.name}
				<IconButton onClick={onClickOpen}>
					{open ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
				</IconButton>
			</ServerNavItem>
			{data.contain.length !== 0 && (
				<Collapse in={open}>
					<div>
						{data.contain.map((i) =>
							i.type === 'folder' ? (
								<Folder key={i.key} data={i} />
							) : (
								<Server key={i.key} data={i} />
							),
						)}
					</div>
				</Collapse>
			)}
		</div>
	);
};

Folder.propTypes = {
	data: PropTypes.object.isRequired,
};

export default Folder;
