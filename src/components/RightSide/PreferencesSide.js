import React, {useCallback} from 'react';
import {MainHeader, SideBody} from '../../styles/cards';
import {AiTwotoneSetting, FaTimes} from 'react-icons/all';
import {BaseSpan, BorderBottomP} from '../../styles/texts';
import {IconButton, TextButton} from '../../styles/buttons';
import {ColBox, RowBox} from '../../styles/divs';
import {useHistory} from 'react-router-dom';

const PreferencesSide = () => {
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
				<IconButton onClick={closeSide()}>
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
					<RowBox align={'center'} padding={'8px'}>
						<input id={'Text_completion'} type='checkbox' />
						<label
							style={{padding: '0px', margin: '0px 8px'}}
							htmlFor='Text_completion'
						>
							Text completion(IntelliSense)
						</label>
					</RowBox>
					<RowBox align={'center'} padding={'8px'}>
						<input id={'Copy_text_on_selection'} type='checkbox' />
						<label
							style={{padding: '0px', margin: '0px 8px'}}
							htmlFor='Copy_text_on_selection'
						>
							Copy text on selection
						</label>
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
	);
};

export default PreferencesSide;
