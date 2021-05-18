import React, {useCallback} from 'react';
import {MainHeader} from '../../styles/cards';
import {AiTwotoneSetting, FaTimes} from 'react-icons/all';
import {BaseSpan, BorderBottomP} from '../../styles/texts';
import {IconButton, TextButton} from '../../styles/buttons';
import {ColBox, RowBox} from '../../styles/divs';
import {useHistory} from 'react-router-dom';
import {Button} from '../../styles/global_design';

const AccountSide = () => {
	const history = useHistory();

	const changePath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[],
	);

	const closeSide = useCallback(() => {
		document.getElementById('right_side_menu').style.display = 'none';
		document.getElementById('right_side_menu').style.width = '0px';
	}, []);

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
				<button style={{zIndex: '10px'}} onClick={closeSide}>
					<FaTimes />
				</button>
			</MainHeader>
			<div>
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
			</div>
		</ColBox>
	);
};

export default AccountSide;
