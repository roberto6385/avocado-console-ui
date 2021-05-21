import React from 'react';
import {useSelector} from 'react-redux';
import '../styles/resize.css';
import {TabPanel} from 'react-tabs';
import SSH_SFTP from './container/SSH_SFTP';
import styled from 'styled-components';
import {WorkSpaceContainer} from '../styles/common';
import SplitPane from 'react-split-pane';

const Panels = (tab) => {
	if (tab.length === 1)
		return (
			<SSH_SFTP
				uuid={tab[0].uuid}
				type={tab[0].type}
				server={tab[0].server}
			/>
		);
	if (tab.length === 2)
		return (
			<SplitPane split='vertical' defaultSize={'50%'}>
				<SSH_SFTP
					uuid={tab[0].uuid}
					type={tab[0].type}
					server={tab[0].server}
				/>
				<SSH_SFTP
					uuid={tab[1].uuid}
					type={tab[1].type}
					server={tab[1].server}
				/>
			</SplitPane>
		);
	if (tab.length === 3)
		return (
			<SplitPane split='vertical' defaultSize={'66%'}>
				<SplitPane split='vertical' defaultSize={'50%'}>
					<SSH_SFTP
						uuid={tab[0].uuid}
						type={tab[0].type}
						server={tab[0].server}
					/>
					<SSH_SFTP
						uuid={tab[1].uuid}
						type={tab[1].type}
						server={tab[1].server}
					/>
				</SplitPane>
				<SSH_SFTP
					uuid={tab[2].uuid}
					type={tab[2].type}
					server={tab[2].server}
				/>
			</SplitPane>
		);
	if (tab.length === 4)
		return (
			<SplitPane split='vertical' defaultSize={'75%'}>
				<SplitPane split='vertical' defaultSize={'66%'}>
					<SplitPane split='vertical' defaultSize={'50%'}>
						<SSH_SFTP
							uuid={tab[0].uuid}
							type={tab[0].type}
							server={tab[0].server}
						/>
						<SSH_SFTP
							uuid={tab[1].uuid}
							type={tab[1].type}
							server={tab[1].server}
						/>
					</SplitPane>
					<SSH_SFTP
						uuid={tab[2].uuid}
						type={tab[2].type}
						server={tab[2].server}
					/>
				</SplitPane>
				<SSH_SFTP
					uuid={tab[3].uuid}
					type={tab[3].type}
					server={tab[3].server}
				/>
			</SplitPane>
		);
	if (tab.length === 5)
		return (
			<SplitPane split='vertical' defaultSize={'80%'}>
				<SplitPane split='vertical' defaultSize={'75%'}>
					<SplitPane split='vertical' defaultSize={'66%'}>
						<SplitPane split='vertical' defaultSize={'50%'}>
							<SSH_SFTP
								uuid={tab[0].uuid}
								type={tab[0].type}
								server={tab[0].server}
							/>
							<SSH_SFTP
								uuid={tab[1].uuid}
								type={tab[1].type}
								server={tab[1].server}
							/>
						</SplitPane>
						<SSH_SFTP
							uuid={tab[2].uuid}
							type={tab[2].type}
							server={tab[2].server}
						/>
					</SplitPane>
					<SSH_SFTP
						uuid={tab[3].uuid}
						type={tab[3].type}
						server={tab[3].server}
					/>
				</SplitPane>
				<SSH_SFTP
					uuid={tab[4].uuid}
					type={tab[4].type}
					server={tab[4].server}
				/>
			</SplitPane>
		);
};

const WorkSpaceTabPanels = () => {
	const {tab, cols} = useSelector((state) => state.common);
	const visibleTab = tab.filter((v) => v.display === true);

	return (
		<WorkSpaceContainer className={'fix-height'}>
			{visibleTab.length <= cols ? (
				Panels(visibleTab)
			) : (
				<SplitPane split='horizontal' defaultSize={'50%'}>
					{Panels(visibleTab.slice(0, cols))}
					{Panels(visibleTab.slice(cols))}
				</SplitPane>
			)}
		</WorkSpaceContainer>
	);
};

export default WorkSpaceTabPanels;
