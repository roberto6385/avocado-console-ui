import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import SplitPane from 'react-split-pane';

import '../styles/resize.css';
import Pane from './Pane';

import styled from 'styled-components';
import {borderColor} from '../styles/global';

export const _Container = styled.div`
	flex: 1;
	display: flex;
	margin: 0;
	padding: 0;
	position: relative;
	width: 100%;
`;

const Panes = (tab) => {
	if (tab.length === 1)
		return (
			<Pane
				uuid={tab[0].uuid}
				type={tab[0].type}
				server={tab[0].server}
			/>
		);

	if (tab.length === 2)
		return (
			<SplitPane split='vertical' defaultSize={'50%'}>
				<Pane
					uuid={tab[0].uuid}
					type={tab[0].type}
					server={tab[0].server}
				/>
				<Pane
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
					<Pane
						uuid={tab[0].uuid}
						type={tab[0].type}
						server={tab[0].server}
					/>
					<Pane
						uuid={tab[1].uuid}
						type={tab[1].type}
						server={tab[1].server}
					/>
				</SplitPane>
				<Pane
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
						<Pane
							uuid={tab[0].uuid}
							type={tab[0].type}
							server={tab[0].server}
						/>
						<Pane
							uuid={tab[1].uuid}
							type={tab[1].type}
							server={tab[1].server}
						/>
					</SplitPane>
					<Pane
						uuid={tab[2].uuid}
						type={tab[2].type}
						server={tab[2].server}
					/>
				</SplitPane>
				<Pane
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
							<Pane
								uuid={tab[0].uuid}
								type={tab[0].type}
								server={tab[0].server}
							/>
							<Pane
								uuid={tab[1].uuid}
								type={tab[1].type}
								server={tab[1].server}
							/>
						</SplitPane>
						<Pane
							uuid={tab[2].uuid}
							type={tab[2].type}
							server={tab[2].server}
						/>
					</SplitPane>
					<Pane
						uuid={tab[3].uuid}
						type={tab[3].type}
						server={tab[3].server}
					/>
				</SplitPane>
				<Pane
					uuid={tab[4].uuid}
					type={tab[4].type}
					server={tab[4].server}
				/>
			</SplitPane>
		);
};

const PanesContainer = () => {
	const {tab, cols, theme} = useSelector((state) => state.common);
	const visibleTab = useMemo(() => tab.filter((v) => v.display === true), [
		tab,
	]);

	return (
		<_Container back={borderColor[theme]}>
			{visibleTab.length <= cols ? (
				Panes(visibleTab)
			) : visibleTab.length <= cols * 2 ? (
				<SplitPane split='horizontal' defaultSize={'50%'}>
					{Panes(visibleTab.slice(0, cols))}
					{Panes(visibleTab.slice(cols))}
				</SplitPane>
			) : (
				<SplitPane split='horizontal' defaultSize={'66%'}>
					<SplitPane split='horizontal' defaultSize={'50%'}>
						{Panes(visibleTab.slice(0, cols))}
						{Panes(visibleTab.slice(cols, cols * 2))}
					</SplitPane>
					{Panes(visibleTab.slice(cols * 2))}
				</SplitPane>
			)}
		</_Container>
	);
};

export default PanesContainer;
