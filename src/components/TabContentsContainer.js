import React, {useCallback} from 'react';
import {PropTypes} from 'prop-types';
import {Card, Col} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {RiTerminalFill} from 'react-icons/ri';
import {BiTransferAlt} from 'react-icons/bi';

import {CLOSE_TAB} from '../reducers/common';
import {FaTimes} from 'react-icons/all';
import SSHTContainer from './SSHT/SSHTContainer';

const TabContentsContainer = ({id, type, display, server, socket}) => {
	const dispatch = useDispatch();

	const onClickDelete = useCallback(
		(i) => () => {
			dispatch({type: CLOSE_TAB, data: i});
		},
		[dispatch],
	);

	return (
		<Col className={display ? 'visible' : 'invisible'}>
			<Card>
				<Card.Header as='h6' style={{padding: '6px 20px'}}>
					{type === 'SSHT' ? <RiTerminalFill /> : <BiTransferAlt />}
					{server?.name}
					<span style={{float: 'right'}}>
						<FaTimes onClick={onClickDelete(id)} />
					</span>
				</Card.Header>
				<SSHTContainer
					id={id}
					type={type}
					display={display}
					server={server}
					socket={socket}
				/>
			</Card>
		</Col>
	);
};

TabContentsContainer.propTypes = {
	id: PropTypes.number.isRequired,
	type: PropTypes.string.isRequired,
	display: PropTypes.bool.isRequired,
	server: PropTypes.object.isRequired,
	socket: PropTypes.object.isRequired,
};

export default TabContentsContainer;
