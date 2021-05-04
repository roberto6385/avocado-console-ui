import React, {useCallback, useState} from 'react';
import {Link} from 'react-router-dom';
import {Collapse, Nav} from 'react-bootstrap';
import {
	AiTwotoneSetting,
	FaUserAlt,
	RiArrowLeftSLine,
	VscFileSymlinkFile,
} from 'react-icons/all';

import {Header, OutlineCol} from '../../styles/common';

const LeftSetting = () => {
	const [open, setOpen] = useState(false);

	const onClickOpen = useCallback(() => {
		setOpen(!open);
	}, [open]);

	return (
		<OutlineCol>
			<Header className='left_header'>LOGO</Header>

			<Nav.Item as={Link} to='/'>
				<RiArrowLeftSLine />
				back
			</Nav.Item>
			<Nav.Item as={Link} to='/account'>
				<FaUserAlt />
				Account
			</Nav.Item>
			<Nav.Item onClick={onClickOpen}>
				<AiTwotoneSetting />
				Preferences
			</Nav.Item>
			<Collapse in={open}>
				<div>
					<Nav.Item as={Link} to='/preferences'>
						일반
					</Nav.Item>
					<Nav.Item as={Link} to='/preferences'>
						프로토콜
					</Nav.Item>
				</div>
			</Collapse>
			<Nav.Item as={Link} to='/identities'>
				<VscFileSymlinkFile />
				Identities
			</Nav.Item>
		</OutlineCol>
	);
};

export default LeftSetting;
