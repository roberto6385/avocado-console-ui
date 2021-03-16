import React from 'react';
import {useSelector} from 'react-redux';
import MainPage from './MainPage';
import TabContentsContainer from './TabContentsContainer';

const WorkSpace = () => {
	const {tab, server, cols_size, visible_tab} = useSelector(
		(state) => state.common,
	);

	return (
		<div
			id='contents-row'
			style={{
				margin: '0px',
				flex: 1,
			}}
		>
			{tab.length !== 0 ? (
				tab.map((data) => (
					<TabContentsContainer
						key={data.id}
						id={data.id}
						type={data.type}
						display={data.display}
						server={data.server}
						socket={data.socket}
					/>
				))
			) : (
				<MainPage />
			)}
		</div>
	);
};

export default WorkSpace;
