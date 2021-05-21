import React, {useCallback} from 'react';
import styled from 'styled-components';
import {
	BORDER_COLOR,
	FOLDER_HEIGHT,
	SIDE_WIDTH,
	SUB_HEIGHT,
} from '../../styles/global_design';
import {
	HiUser,
	IoSettingsSharp,
	MdPermIdentity,
	RiArrowLeftSLine,
} from 'react-icons/all';
import {useHistory} from 'react-router-dom';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: ${SIDE_WIDTH};
	min-width: ${SIDE_WIDTH};
	border-right: 1px solid ${BORDER_COLOR};
`;

const Back_Container = styled.div`
	display: flex;
	align-items: center;
	height: ${SUB_HEIGHT};
	padding: 0px 16px;
	border-bottom: 1px solid ${BORDER_COLOR};
	cursor: pointer;
`;

const Span = styled.span`
	padding: 0px 12px;
`;
const OtherPage_Container = styled.ul`
	padding: 8px 0px;
`;

const ListItem = styled.li`
	display: flex;
	align-items: center;
	padding: 10px 16px;
	height: ${FOLDER_HEIGHT};
`;

const Aside_Other = () => {
	const history = useHistory();

	const changePath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[],
	);

	return (
		<Container>
			<Back_Container onClick={changePath('/')}>
				<span className='material-icons button_large'>
					chevron_left
				</span>
				<Span>Back</Span>
			</Back_Container>
			<OtherPage_Container>
				<ListItem>
					<span className='material-icons button_midium'>person</span>
					<Span>Account</Span>
				</ListItem>
				<ListItem>
					<span className='material-icons button_midium'>
						settings
					</span>
					<Span>Preferences</Span>
				</ListItem>
				<ListItem>
					<span className='material-icons button_midium'>
						assignment_ind
					</span>
					<Span>Identity</Span>
				</ListItem>
			</OtherPage_Container>
		</Container>
	);
};

export default Aside_Other;
