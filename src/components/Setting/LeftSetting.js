import React, {useCallback, useState} from 'react';
import {Link} from 'react-router-dom';
import {Collapse, Nav} from 'react-bootstrap';
import {
	AiTwotoneSetting,
	FaBars,
	FaUserAlt,
	RiArrowLeftSLine,
	VscFileSymlinkFile,
} from 'react-icons/all';

import {ColBox} from '../../styles/divs';
import {MainHeader} from '../../styles/cards';
import {MAIN_COLOR} from '../../styles/global';
import {IconButton} from '../../styles/buttons';

const LeftSetting = () => {
	const [open, setOpen] = useState(false);

	const onClickOpen = useCallback(() => {
		setOpen(!open);
	}, [open]);

	return (
		<ColBox width={'250px'}>
			<MainHeader back={MAIN_COLOR} color={'white'}>
				<IconButton>
					<FaBars style={{color: 'white'}} />
				</IconButton>
				<span>LOGO</span>
			</MainHeader>

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
		</ColBox>
	);
};

export default LeftSetting;
