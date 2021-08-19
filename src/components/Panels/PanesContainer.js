import React, {useMemo} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import SplitPane from 'react-split-pane';
import styled from 'styled-components';

import '../../styles/resize.css';
import PaneOrganizer from './PaneOrganizer';
import LoadingSpinner from '../LoadingSpinner';
import {tabBarSelector} from '../../reducers/tabBar';
import {sshSelector} from '../../reducers/ssh';

export const _Container = styled.div`
	flex: 1;
	display: flex;
	margin: 0;
	padding: 0;
	position: relative;
	width: 100%;
`;

const PanesContainer = () => {
	const {terminalTabs, cols} = useSelector(tabBarSelector.all);
	const {loading: sshLoading} = useSelector(sshSelector.all);
	const {loading: sftpLoading} = useSelector(
		(state) => state.sftp,
		shallowEqual,
	);
	const visibleTerminalTabs = useMemo(
		() => terminalTabs.filter((v) => v.display === true),
		[terminalTabs],
	);

	return (
		<_Container>
			{(sshLoading || sftpLoading) && <LoadingSpinner />}

			{visibleTerminalTabs.length <= cols ? (
				<PaneOrganizer tab={visibleTerminalTabs} />
			) : visibleTerminalTabs.length <= cols * 2 ? (
				<SplitPane split='horizontal' defaultSize={'50%'}>
					<PaneOrganizer tab={visibleTerminalTabs.slice(0, cols)} />
					<PaneOrganizer tab={visibleTerminalTabs.slice(cols)} />
				</SplitPane>
			) : (
				<SplitPane split='horizontal' defaultSize={'66%'}>
					<SplitPane split='horizontal' defaultSize={'50%'}>
						<PaneOrganizer
							tab={visibleTerminalTabs.slice(0, cols)}
						/>
						<PaneOrganizer
							tab={visibleTerminalTabs.slice(cols, cols * 2)}
						/>
					</SplitPane>
					<PaneOrganizer tab={visibleTerminalTabs.slice(cols * 2)} />
				</SplitPane>
			)}
		</_Container>
	);
};

export default PanesContainer;
