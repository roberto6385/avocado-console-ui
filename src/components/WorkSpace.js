import React from 'react';
import {useSelector} from 'react-redux';
import MainPage from './MainPage';
import TabContentsContainer from './TabContentsContainer';
import styled from 'styled-components';

const WorkSpaceWrapper = styled.div`
	flex: 1;
`;

const WorkSpaceContainer = styled.div`
	margin: 0;
	padding: 0;
	height: 100%;
	max-width: none;
	display: flex;
	flex-wrap: wrap;
`;

const WorkSpace = () => {
	const {tab} = useSelector((state) => state.common);

	return (
		<WorkSpaceWrapper id='contents-row'>
			{tab.length !== 0 ? (
				<WorkSpaceContainer>
					{tab.map((data) => (
						<TabContentsContainer
							key={data.id}
							index={data.id}
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
		</WorkSpaceWrapper>
	);
};

export default WorkSpace;
