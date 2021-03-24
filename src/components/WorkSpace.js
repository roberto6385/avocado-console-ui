import React from 'react';
import {useSelector} from 'react-redux';
import MainPage from './MainPage';
import TabContentsContainer from './TabContentsContainer';
import {WorkSpaceContainer, WorkSpaceWrapper} from '../styles/common';

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
