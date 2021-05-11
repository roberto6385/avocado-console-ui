import React, {useCallback} from 'react';
import {ColBox, RowBox, SideBox} from '../styles/divs';
import {MainHeader, SideBody} from '../styles/cards';
import {AiTwotoneSetting, FaTimes} from 'react-icons/all';
import {BaseSpan, BorderBottomP} from '../styles/texts';
import {IconButton, TextButton} from '../styles/buttons';
import {useHistory} from 'react-router-dom';

const SideMenuContainer = () => {
	const history = useHistory();

	const changePath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[],
	);

	return (
		<SideBox
			id={'right_side_menu'}
			minWidth={'300px'}
			position={'absolute'}
			right={'0px'}
			height={'100%'}
			// opacity={0.5}
			back={'white'}
		>
			<ColBox width={'100%'}>
				<MainHeader justify={'space-between'}>
					<div
						onClick={changePath('/preferences')}
						style={{
							cursor: 'pointer',
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<AiTwotoneSetting />
						<BaseSpan>Preferences</BaseSpan>
					</div>
					<IconButton onClick={() => console.log('close')}>
						<FaTimes />
					</IconButton>
				</MainHeader>
				<SideBody padding={'4px 12px'} direction={'column'}>
					<ColBox>
						<BorderBottomP>General</BorderBottomP>
						<p>UI Theme</p>
						<RowBox justify={'center'}>
							<TextButton>Light Mode</TextButton>
							<TextButton>Dark Mode</TextButton>
						</RowBox>
					</ColBox>
					<ColBox>
						<BorderBottomP>Terminal</BorderBottomP>
						<p>UI Theme</p>
						<select name='' id=''>
							<option value='aaa'>aaa</option>
							<option value='bbb'>bbb</option>
							<option value='ccc'>ccc</option>
						</select>
						<p>Font</p>
						<RowBox justify={'center'}>
							<TextButton>Robota</TextButton>
							<TextButton>Godic</TextButton>
						</RowBox>
						<RowBox justify={'center'}>
							<TextButton>Dark Mode</TextButton>
							<TextButton>PreGodic</TextButton>
						</RowBox>
					</ColBox>
					<ColBox>
						<BorderBottomP>SFTP</BorderBottomP>
						<p>Editor Theme</p>
						<select name='' id=''>
							<option value='aaa'>aaa</option>
							<option value='bbb'>bbb</option>
							<option value='ccc'>ccc</option>
						</select>
					</ColBox>
				</SideBody>
			</ColBox>
		</SideBox>
	);
};

export default SideMenuContainer;
