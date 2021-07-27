import React, {useMemo} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
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
	const {tab, cols} = useSelector((state) => state.common, shallowEqual);
	const {loading: sshLoading} = useSelector(
		(state) => state.ssh,
		shallowEqual,
	);
	const {loading: sftpLoading} = useSelector(
		(state) => state.sftp,
		shallowEqual,
	);
	const visibleTabs = useMemo(
		() => tab.filter((v) => v.display === true),
		[tab],
	);

	return (
		<_Container>
			{(sshLoading || sftpLoading) && <LoadingSpinner />}

			{visibleTabs.length <= cols ? (
				<Panes tab={visibleTabs} />
			) : visibleTabs.length <= cols * 2 ? (
				<SplitPane split='horizontal' defaultSize={'50%'}>
					<Panes tab={visibleTabs.slice(0, cols)} />
					<Panes tab={visibleTabs.slice(cols)} />
				</SplitPane>
			) : (
				<SplitPane split='horizontal' defaultSize={'66%'}>
					<SplitPane split='horizontal' defaultSize={'50%'}>
						<Panes tab={visibleTabs.slice(0, cols)} />
						<Panes tab={visibleTabs.slice(cols, cols * 2)} />
					</SplitPane>
					<Panes tab={visibleTabs.slice(cols * 2)} />
				</SplitPane>
			)}
		</_Container>
	);
};

export default PanesContainer;
