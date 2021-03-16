import React, {useCallback} from 'react';
import {PropTypes} from 'prop-types';
import {Card} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {RiTerminalFill} from 'react-icons/ri';
import {BiTransferAlt} from 'react-icons/bi';

import {CLOSE_TAB} from '../reducers/common';
import {FaTimes} from 'react-icons/all';
import SSHTContainer from './SSHT/SSHTContainer';
import styled from 'styled-components';
import {SECOND_NAV_HEIGHT} from '../styles/global';

const ContainerCardHeader = styled(Card.Header)`
	padding: 7px 20px;
	margin: 0;
	height: ${SECOND_NAV_HEIGHT};
	background: rgba(0, 0, 0, 0.03);
`;

const TabContentsContainer = ({id, type, display, server, socket}) => {
	const dispatch = useDispatch();

	const onClickDelete = useCallback(
		(i) => () => {
			dispatch({type: CLOSE_TAB, data: i});
		},
		[dispatch],
	);

	return (
		<Card
			className={display ? 'visible' : 'invisible'}
			style={{height: '100%'}}
		>
			<ContainerCardHeader as='h6'>
				{type === 'SSHT' ? <RiTerminalFill /> : <BiTransferAlt />}
				{server?.name}
				<span style={{float: 'right'}}>
					<FaTimes onClick={onClickDelete(id)} />
				</span>
			</ContainerCardHeader>
			<SSHTContainer
				id={id}
				type={type}
				display={display}
				my_server={server}
				socket={socket}
			/>
		</Card>
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
