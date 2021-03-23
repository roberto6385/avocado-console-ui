import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

import MainPage from './MainPage';
import TabContentsContainer from './TabContentsContainer';

const WorkSpaceWrapper = styled.div`
	flex: 1;
`;

const WorkSpaceContainer = styled.div`
	margin: 0;
	padding: 0;
	display: flex;
	flex-wrap: wrap;
`;

const WorkSpace = () => {
	const {tab} = useSelector((state) => state.common);

	return (
		<WorkSpaceWrapper className={'fix-height'} id='contents-row'>
			{tab.length !== 0 ? (
				<WorkSpaceContainer className={'fix-height'}>
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
