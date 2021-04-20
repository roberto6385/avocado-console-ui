import React from 'react';
import {useSelector} from 'react-redux';
import SplitPane from 'react-split-pane';

import TabContentContainer from './TabContentContainer';
import {WorkSpaceContainer} from '../styles/common';
import '../styles/resize.css';

const WorkSpace = () => {
	const {tab, cols} = useSelector((state) => state.common);
	const visibleTab = tab.filter((v) => v.display === true);

	return (
		<WorkSpaceContainer className={'fix-height'}>
			{visibleTab.length === 1 ? (
				<TabContentContainer
					key={visibleTab[0].id}
					index={visibleTab[0].id}
					type={visibleTab[0].type}
					server={visibleTab[0].server}
					socket={visibleTab[0].socket}
				/>
			) : visibleTab.length === 2 ? (
				<SplitPane split='vertical' defaultSize={'50%'}>
					<TabContentContainer
						key={visibleTab[0].id}
						index={visibleTab[0].id}
						type={visibleTab[0].type}
						server={visibleTab[0].server}
						socket={visibleTab[0].socket}
					/>
					<TabContentContainer
						key={visibleTab[1].id}
						index={visibleTab[1].id}
						type={visibleTab[1].type}
						server={visibleTab[1].server}
						socket={visibleTab[1].socket}
					/>
				</SplitPane>
			) : visibleTab.length === 3 && cols === 2 ? (
				<SplitPane split='horizontal' defaultSize={'50%'}>
					<SplitPane split='vertical' defaultSize={'50%'}>
						<TabContentContainer
							key={visibleTab[0].id}
							index={visibleTab[0].id}
							type={visibleTab[0].type}
							server={visibleTab[0].server}
							socket={visibleTab[0].socket}
						/>
						<TabContentContainer
							key={visibleTab[1].id}
							index={visibleTab[1].id}
							type={visibleTab[1].type}
							server={visibleTab[1].server}
							socket={visibleTab[1].socket}
						/>
					</SplitPane>
					<TabContentContainer
						key={visibleTab[2].id}
						index={visibleTab[2].id}
						type={visibleTab[2].type}
						server={visibleTab[2].server}
						socket={visibleTab[2].socket}
					/>
				</SplitPane>
			) : (
				<SplitPane split='vertical' defaultSize={'66%'}>
					<SplitPane split='vertical' defaultSize={'50%'}>
						<TabContentContainer
							key={visibleTab[0].id}
							index={visibleTab[0].id}
							type={visibleTab[0].type}
							server={visibleTab[0].server}
							socket={visibleTab[0].socket}
						/>
						<TabContentContainer
							key={visibleTab[1].id}
							index={visibleTab[1].id}
							type={visibleTab[1].type}
							server={visibleTab[1].server}
							socket={visibleTab[1].socket}
						/>
					</SplitPane>
					<TabContentContainer
						key={visibleTab[2].id}
						index={visibleTab[2].id}
						type={visibleTab[2].type}
						server={visibleTab[2].server}
						socket={visibleTab[2].socket}
					/>
				</SplitPane>
			)}
		</WorkSpaceContainer>
	);
};

export default WorkSpace;
