import React from 'react';
import {Link} from 'react-router-dom';

import {Header, OutlineCol} from '../../styles/common';
import {Nav} from 'react-bootstrap';

const LeftSetting = () => {
	return (
		<OutlineCol>
			<Header>
				<Nav.Item className='left_header'>SSHTerminal / SFTP</Nav.Item>
				<Nav.Item as={Link} to='/'>
					back
				</Nav.Item>
			</Header>
		</OutlineCol>
	);
};

export default LeftSetting;
