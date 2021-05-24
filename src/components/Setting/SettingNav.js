import React, {useCallback} from 'react';
import styled from 'styled-components';
import {
	BORDER_COLOR,
	FOLDER_HEIGHT,
	SIDE_WIDTH,
	SUB_HEIGHT,
} from '../../styles/global_design';

import {useHistory} from 'react-router-dom';

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	width: ${SIDE_WIDTH};
	min-width: ${SIDE_WIDTH};
	border-right: 1px solid ${BORDER_COLOR};
`;

const _BackContainer = styled.div`
	display: flex;
	align-items: center;
	height: ${SUB_HEIGHT};
	padding: 0px 16px;
	border-bottom: 1px solid ${BORDER_COLOR};
	cursor: pointer;
`;

const _Span = styled.span`
	padding: 0px 12px;
`;

const _Ul = styled.ul`
	padding: 8px 0px;
`;

const _Li = styled.li`
	display: flex;
	align-items: center;
	padding: 10px 16px;
	height: ${FOLDER_HEIGHT};
`;

const SettingNav = () => {
	const history = useHistory();

	const changePath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[],
	);

	return (
		<_Container>
			<_BackContainer onClick={changePath('/')}>
				<span className='material-icons button_large'>
					chevron_left
				</span>
				<_Span>Back</_Span>
			</_BackContainer>
			<_Ul>
				<_Li onClick={changePath('/account')}>
					<span className='material-icons button_midium'>person</span>
					<_Span>Account</_Span>
				</_Li>
				<_Li onClick={changePath('/preferences')}>
					<span className='material-icons button_midium'>
						settings
					</span>
					<_Span>Preferences</_Span>
				</_Li>
				<_Li onClick={changePath('/identities')}>
					<span className='material-icons button_midium'>
						assignment_ind
					</span>
					<_Span>Identity</_Span>
				</_Li>
			</_Ul>
		</_Container>
	);
};

export default SettingNav;
