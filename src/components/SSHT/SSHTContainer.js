import React, {useCallback, useEffect} from 'react';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {Card} from 'react-bootstrap';
import {FaExpand} from 'react-icons/all';

import {CHANGE_CURRENT_TAB} from '../../reducers/common';

const SSHContainer = ({id, type, display, server, socket}) => {
	const dispatch = useDispatch();

	const onCLickFullScreen = useCallback(() => {
		// document.getElementById(id).requestFullscreen();
	}, [id]);

	const onCLickChangeCurrentTab = useCallback(() => {
		// dispatch({type: CHANGE_CURRENT_TAB, data: id});
	}, []);

	return (
		<div>
			<Card.Header style={{position: 'relative'}}>
				<button
					style={{
						background: 'transparent',
						outline: 'none',
						border: 'none',
					}}
				>
					<FaExpand
						onClick={onCLickFullScreen}
						style={{fontSize: '17px'}}
					/>
				</button>
			</Card.Header>
			<Card.Body onClick={onCLickChangeCurrentTab}>
				THIS IS BODY
			</Card.Body>
		</div>
	);
};

SSHContainer.propTypes = {
	id: PropTypes.number.isRequired,
	type: PropTypes.string.isRequired,
	display: PropTypes.bool.isRequired,
	server: PropTypes.object.isRequired,
	socket: PropTypes.object.isRequired,
};

export default SSHContainer;
