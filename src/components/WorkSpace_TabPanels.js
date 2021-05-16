import React from 'react';
import {useSelector} from 'react-redux';
// import SplitPane from 'react-split-pane';
import Split from 'react-split';
import '../styles/resize.css';
import {TabPanel} from 'react-tabs';
import SSH_SFTP from './container/SSH_SFTP';
import styled from 'styled-components';

const SSH_SFTP_TabPanel = styled(TabPanel)`
	flex: 1;
`;

const WorkSpace_TabPanels = () => {
	const {tab, cols} = useSelector((state) => state.common);
	const visibleTab = tab.filter((v) => v.display === true);

	return visibleTab.length === 1 ? (
		<SSH_SFTP_TabPanel forceRender={true}>
			<SSH_SFTP
				uuid={visibleTab[0].uuid}
				type={visibleTab[0].type}
				server={visibleTab[0].server}
			/>
		</SSH_SFTP_TabPanel>
	) : visibleTab.length === 2 ? (
		// <Split className='split'>
		<div style={{display: 'flex'}}>
			<SSH_SFTP_TabPanel forceRender={true}>
				<SSH_SFTP
					uuid={visibleTab[0].uuid}
					type={visibleTab[0].type}
					server={visibleTab[0].server}
				/>
			</SSH_SFTP_TabPanel>
			<SSH_SFTP_TabPanel forceRender={true}>
				<SSH_SFTP
					uuid={visibleTab[1].uuid}
					type={visibleTab[1].type}
					server={visibleTab[1].server}
				/>
			</SSH_SFTP_TabPanel>
		</div>
	) : // </Split>
	visibleTab.length === 3 && cols === 2 ? (
		<Split className='split'>
			<Split className='split'>
				<SSH_SFTP_TabPanel forceRender={true}>
					<SSH_SFTP
						uuid={visibleTab[0].uuid}
						type={visibleTab[0].type}
						server={visibleTab[0].server}
					/>
				</SSH_SFTP_TabPanel>
				<SSH_SFTP_TabPanel forceRender={true}>
					<SSH_SFTP
						uuid={visibleTab[1].uuid}
						type={visibleTab[1].type}
						server={visibleTab[1].server}
					/>
				</SSH_SFTP_TabPanel>
			</Split>
			<SSH_SFTP_TabPanel forceRender={true}>
				<SSH_SFTP
					uuid={visibleTab[2].uuid}
					type={visibleTab[2].type}
					server={visibleTab[2].server}
				/>
			</SSH_SFTP_TabPanel>
		</Split>
	) : visibleTab.length === 3 && cols === 3 ? (
		<Split>
			<Split direction='vertical'>
				<SSH_SFTP_TabPanel forceRender={true}>
					<SSH_SFTP
						uuid={visibleTab[0].uuid}
						type={visibleTab[0].type}
						server={visibleTab[0].server}
					/>
				</SSH_SFTP_TabPanel>
				<SSH_SFTP_TabPanel forceRender={true}>
					<SSH_SFTP
						uuid={visibleTab[1].uuid}
						type={visibleTab[1].type}
						server={visibleTab[1].server}
					/>
				</SSH_SFTP_TabPanel>
			</Split>
			<SSH_SFTP_TabPanel forceRender={true}>
				<SSH_SFTP
					uuid={visibleTab[2].uuid}
					type={visibleTab[2].type}
					server={visibleTab[2].server}
				/>
			</SSH_SFTP_TabPanel>
		</Split>
	) : (
		<Split direction='vertical'>
			<Split>
				<SSH_SFTP_TabPanel forceRender={true}>
					<SSH_SFTP
						uuid={visibleTab[0].uuid}
						type={visibleTab[0].type}
						server={visibleTab[0].server}
					/>
				</SSH_SFTP_TabPanel>
				<SSH_SFTP_TabPanel forceRender={true}>
					<SSH_SFTP
						uuid={visibleTab[1].uuid}
						type={visibleTab[1].type}
						server={visibleTab[1].server}
					/>
				</SSH_SFTP_TabPanel>
			</Split>
			<Split>
				<SSH_SFTP_TabPanel forceRender={true}>
					<SSH_SFTP
						uuid={visibleTab[2].uuid}
						type={visibleTab[2].type}
						server={visibleTab[2].server}
					/>
				</SSH_SFTP_TabPanel>
				<SSH_SFTP_TabPanel forceRender={true}>
					<SSH_SFTP
						uuid={visibleTab[3].uuid}
						type={visibleTab[3].type}
						server={visibleTab[3].server}
					/>
				</SSH_SFTP_TabPanel>
			</Split>
		</Split>
	);
};

export default WorkSpace_TabPanels;
