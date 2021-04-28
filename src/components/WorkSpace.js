import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import SplitPane from 'react-split-pane';

import TabContentContainer from './TabContentContainer';
import {WorkSpaceContainer} from '../styles/common';
import '../styles/resize.css';

const WorkSpace = () => {
	const {tab, cols} = useSelector((state) => state.common);
	const visibleTab = tab.filter((v) => v.display === true);
	console.log(visibleTab);

	// const container = (i) => (
	// 	<TabContentContainer
	// 		key={visibleTab[i].id}mm
	// 		index={visibleTab[i].id}
	// 		type={visibleTab[i].type}
	// 		server={visibleTab[i].server}
	// 		socket={visibleTab[i].socket}
	// 	/>
	// );

	const onChangeSize = useCallback((size) => {
		console.log(size);
	}, []);

	return (
		<WorkSpaceContainer className={'fix-height'}>
			{visibleTab.length === 1 ? (
				<TabContentContainer
					uuid={visibleTab[0].uuid}
					type={visibleTab[0].type}
					server={visibleTab[0].server}
				/>
			) : visibleTab.length === 2 ? (
				<SplitPane
					split='vertical'
					defaultSize={'50%'}
					onChange={onChangeSize}
				>
					<TabContentContainer
						uuid={visibleTab[0].uuid}
						type={visibleTab[0].type}
						server={visibleTab[0].server}
					/>
					<TabContentContainer
						uuid={visibleTab[1].uuid}
						type={visibleTab[1].type}
						server={visibleTab[1].server}
					/>
				</SplitPane>
			) : visibleTab.length === 3 && cols === 2 ? (
				<SplitPane split='horizontal' defaultSize={'50%'}>
					<SplitPane split='vertical' defaultSize={'50%'}>
						<TabContentContainer
							uuid={visibleTab[0].uuid}
							type={visibleTab[0].type}
							server={visibleTab[0].server}
						/>
						<TabContentContainer
							uuid={visibleTab[1].uuid}
							type={visibleTab[1].type}
							server={visibleTab[1].server}
						/>
					</SplitPane>
					<TabContentContainer
						uuid={visibleTab[2].uuid}
						type={visibleTab[2].type}
						server={visibleTab[2].server}
					/>
				</SplitPane>
			) : visibleTab.length === 3 && cols === 2 ? (
				<SplitPane split='vertical' defaultSize={'66%'}>
					<SplitPane split='vertical' defaultSize={'50%'}>
						<TabContentContainer
							uuid={visibleTab[0].uuid}
							type={visibleTab[0].type}
							server={visibleTab[0].server}
						/>
						<TabContentContainer
							uuid={visibleTab[1].uuid}
							type={visibleTab[1].type}
							server={visibleTab[1].server}
						/>
					</SplitPane>
					<TabContentContainer
						uuid={visibleTab[2].uuid}
						type={visibleTab[2].type}
						server={visibleTab[2].server}
					/>
				</SplitPane>
			) : (
				<SplitPane split='horizontal' defaultSize={'50%'}>
					<SplitPane split='vertical' defaultSize={'50%'}>
						<TabContentContainer
							uuid={visibleTab[0].uuid}
							type={visibleTab[0].type}
							server={visibleTab[0].server}
						/>
						<TabContentContainer
							uuid={visibleTab[1].uuid}
							type={visibleTab[1].type}
							server={visibleTab[1].server}
						/>
					</SplitPane>
					<SplitPane split='vertical' defaultSize={'50%'}>
						<TabContentContainer
							uuid={visibleTab[2].uuid}
							type={visibleTab[2].type}
							server={visibleTab[2].server}
						/>
						<TabContentContainer
							uuid={visibleTab[3].uuid}
							type={visibleTab[3].type}
							server={visibleTab[3].server}
						/>
					</SplitPane>
				</SplitPane>
			)}
		</WorkSpaceContainer>
	);
};

export default WorkSpace;
