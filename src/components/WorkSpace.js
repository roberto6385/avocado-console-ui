import React from 'react';
import {useSelector} from 'react-redux';

import TabContentContainer from './TabContentContainer';
import {WorkSpaceContainer} from '../styles/common';

const WorkSpace = () => {
	const {tab} = useSelector((state) => state.common);

	return (
		<WorkSpaceContainer className={'fix-height'}>
			{tab.map((data) => (
				<TabContentContainer
					key={data.id}
					index={data.id}
					type={data.type}
					display={data.display}
					server={data.server}
					socket={data.socket}
				/>
			))}
		</WorkSpaceContainer>
	);
};

export default WorkSpace;
