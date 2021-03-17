import React from 'react';
import {useSelector} from 'react-redux';
import MainPage from './MainPage';
import TabContentsContainer from './TabContentsContainer';
import {Container, Row} from 'react-bootstrap';
import styled from 'styled-components';

const WorkSpaceDiv = styled.div`
	flex: 1;
`;

const WorkSpaceContainer = styled(Container)`
	margin: 0;
	padding: 0;
	height: 100%;
	max-width: none;
`;

const WorkSpace = () => {
	const {tab, server, cols_size, visible_tab} = useSelector(
		(state) => state.common,
	);

	return (
		<WorkSpaceDiv id='contents-row'>
			{tab.length !== 0 ? (
				<WorkSpaceContainer>
					{tab.map((data) => (
						<TabContentsContainer
							key={data.id}
							id={data.id}
							type={data.type}
							display={data.display}
							server={data.server}
							socket={data.socket}
						/>
					))}
				</WorkSpaceContainer>
			) : (
				<MainPage />
			)}
		</WorkSpaceDiv>
	);
};

export default WorkSpace;
