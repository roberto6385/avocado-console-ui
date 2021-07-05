import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import SplitPane from 'react-split-pane';
import styled from 'styled-components';

import '../styles/resize.css';
import Panes from './Panes';
import LoadingSpinner from './loadingSpinner';

export const _Container = styled.div`
	flex: 1;
	display: flex;
	margin: 0;
	padding: 0;
	position: relative;
	width: 100%;
`;

const PanesContainer = () => {
	const {tab, cols} = useSelector((state) => state.common);

	const {loading: sshLoading} = useSelector((state) => state.ssh);
	const {loading: sftpLoading} = useSelector((state) => state.sftp);
	const visibleTab = useMemo(
		() => tab.filter((v) => v.display === true),
		[tab],
	);
	return (
		<_Container>
			{(sshLoading || sftpLoading) && <LoadingSpinner />}

			{visibleTab.length <= cols ? (
				<Panes tab={visibleTab} />
			) : visibleTab.length <= cols * 2 ? (
				<SplitPane split='horizontal' defaultSize={'50%'}>
					<Panes tab={visibleTab.slice(0, cols)} />
					<Panes tab={visibleTab.slice(cols)} />
				</SplitPane>
			) : (
				<SplitPane split='horizontal' defaultSize={'66%'}>
					<SplitPane split='horizontal' defaultSize={'50%'}>
						<Panes tab={visibleTab.slice(0, cols)} />
						<Panes tab={visibleTab.slice(cols, cols * 2)} />
					</SplitPane>
					<Panes tab={visibleTab.slice(cols * 2)} />
				</SplitPane>
			)}
		</_Container>
	);
};

export default PanesContainer;
