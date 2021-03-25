import React from 'react';
import {useSelector} from 'react-redux';
import MainPage from './MainPage';
import TabContentsContainer from './TabContentsContainer';
import {Work, WorkSpaceContainer} from '../styles/common';

const WorkSpace = () => {
	const {tab} = useSelector((state) => state.common);

	return (
		<WorkSpaceContainer className={'fix-height'}>
			{tab.length !== 0 ? (
				<Work className={'fix-height'}>
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
				</Work>
			) : (
				<MainPage />
			)}
		</WorkSpaceContainer>
	);
};

export default WorkSpace;
