import React, {useCallback} from 'react';
import {MainHeader, SideBody} from '../../styles/cards';
import {AiTwotoneSetting, FaTimes} from 'react-icons/all';
import {BaseSpan, BorderBottomP} from '../../styles/texts';
import {IconButton, TextButton} from '../../styles/buttons';
import {ColBox, RowBox} from '../../styles/divs';
import {useHistory} from 'react-router-dom';

const AccountSide = () => {
	const history = useHistory();

	const changePath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[],
	);

	const closeSide = useCallback(
		() => () => {
			document.getElementById('right_side_menu').style.width = '0px';
		},
		[],
	);

	return (
		<ColBox width={'100%'}>
			<MainHeader justify={'space-between'}>
				<div
					style={{
						cursor: 'pointer',
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<AiTwotoneSetting />
					<BaseSpan>Account</BaseSpan>
				</div>
				<IconButton onClick={closeSide()}>
					<FaTimes />
				</IconButton>
			</MainHeader>
			<SideBody padding={'4px 12px'} direction={'column'}>
				<ColBox>
					<p>Account</p>
					<input type='text' />

					<p>Full name</p>
					<input type='text' />

					<p>Email Address</p>
					<input type='text' />

					<p>Authorization</p>
					<button onClick={changePath('/account')}>
						Change Authorization
					</button>
				</ColBox>
			</SideBody>
		</ColBox>
	);
};

export default AccountSide;
