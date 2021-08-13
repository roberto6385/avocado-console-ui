import React, {useMemo} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import SplitPane from 'react-split-pane';
import styled from 'styled-components';

import '../../styles/resize.css';
import PaneOrganizer from './PaneOrganizer';
import LoadingSpinner from '../LoadingSpinner';
import {tabBarSelector} from '../../reducers/tabBar';

export const _Container = styled.div`
	flex: 1;
	display: flex;
	margin: 0;
	padding: 0;
	position: relative;
	width: 100%;
`;

const PanesContainer = () => {
	const {tabs, cols} = useSelector(tabBarSelector.all);
	const {loading: sshLoading} = useSelector(
		(state) => state.ssh,
		shallowEqual,
	);
	const {loading: sftpLoading} = useSelector(
		(state) => state.sftp,
		shallowEqual,
	);
	const visibleTabs = useMemo(
		() => tabs.filter((v) => v.display === true),
		[tabs],
	);

	return (
		<_Container>
			{(sshLoading || sftpLoading) && <LoadingSpinner />}

			{visibleTabs.length <= cols ? (
				<PaneOrganizer tab={visibleTabs} />
			) : visibleTabs.length <= cols * 2 ? (
				<SplitPane split='horizontal' defaultSize={'50%'}>
					<PaneOrganizer tab={visibleTabs.slice(0, cols)} />
					<PaneOrganizer tab={visibleTabs.slice(cols)} />
				</SplitPane>
			) : (
				<SplitPane split='horizontal' defaultSize={'66%'}>
					<SplitPane split='horizontal' defaultSize={'50%'}>
						<PaneOrganizer tab={visibleTabs.slice(0, cols)} />
						<PaneOrganizer
							tab={visibleTabs.slice(cols, cols * 2)}
						/>
					</SplitPane>
					<PaneOrganizer tab={visibleTabs.slice(cols * 2)} />
				</SplitPane>
			)}
		</_Container>
	);
};

export default PanesContainer;
