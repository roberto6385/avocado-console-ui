import Pane from './Pane';
import React from 'react';
import PropTypes from 'prop-types';
import SplitPane from 'react-split-pane';
import styled from 'styled-components';

const _Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	.hidden {
		display: none;
	}
`;

const PaneOrganizer = ({tab}) => {
	return (
		<_Container>
			{tab.length === 1 && (
				<Pane
					uuid={tab[0].uuid}
					type={tab[0].type}
					resourceKey={tab[0].resourceKey}
				/>
			)}
			{tab.length === 2 && (
				<SplitPane split='vertical' defaultSize={'50%'}>
					<Pane
						uuid={tab[0].uuid}
						type={tab[0].type}
						resourceKey={tab[0].resourceKey}
					/>
					<Pane
						uuid={tab[1].uuid}
						type={tab[1].type}
						resourceKey={tab[1].resourceKey}
					/>
				</SplitPane>
			)}
			{tab.length === 3 && (
				<SplitPane split='vertical' defaultSize={'66%'}>
					<SplitPane split='vertical' defaultSize={'50%'}>
						<Pane
							uuid={tab[0].uuid}
							type={tab[0].type}
							resourceKey={tab[0].resourceKey}
						/>
						<Pane
							uuid={tab[1].uuid}
							type={tab[1].type}
							resourceKey={tab[1].resourceKey}
						/>
					</SplitPane>
					<Pane
						uuid={tab[2].uuid}
						type={tab[2].type}
						resourceKey={tab[2].resourceKey}
					/>
				</SplitPane>
			)}
			{tab.length === 4 && (
				<SplitPane split='vertical' defaultSize={'75%'}>
					<SplitPane split='vertical' defaultSize={'66%'}>
						<SplitPane split='vertical' defaultSize={'50%'}>
							<Pane
								uuid={tab[0].uuid}
								type={tab[0].type}
								resourceKey={tab[0].resourceKey}
							/>
							<Pane
								uuid={tab[1].uuid}
								type={tab[1].type}
								resourceKey={tab[1].resourceKey}
							/>
						</SplitPane>
						<Pane
							uuid={tab[2].uuid}
							type={tab[2].type}
							resourceKey={tab[2].resourceKey}
						/>
					</SplitPane>
					<Pane
						uuid={tab[3].uuid}
						type={tab[3].type}
						resourceKey={tab[3].resourceKey}
					/>
				</SplitPane>
			)}
			{tab.length === 5 && (
				<SplitPane split='vertical' defaultSize={'80%'}>
					<SplitPane split='vertical' defaultSize={'75%'}>
						<SplitPane split='vertical' defaultSize={'66%'}>
							<SplitPane split='vertical' defaultSize={'50%'}>
								<Pane
									uuid={tab[0].uuid}
									type={tab[0].type}
									resourceKey={tab[0].resourceKey}
								/>
								<Pane
									uuid={tab[1].uuid}
									type={tab[1].type}
									resourceKey={tab[1].resourceKey}
								/>
							</SplitPane>
							<Pane
								uuid={tab[2].uuid}
								type={tab[2].type}
								resourceKey={tab[2].resourceKey}
							/>
						</SplitPane>
						<Pane
							uuid={tab[3].uuid}
							type={tab[3].type}
							resourceKey={tab[3].resourceKey}
						/>
					</SplitPane>
					<Pane
						uuid={tab[4].uuid}
						type={tab[4].type}
						resourceKey={tab[4].resourceKey}
					/>
				</SplitPane>
			)}
		</_Container>
	);
};

PaneOrganizer.propTypes = {
	tab: PropTypes.array.isRequired,
};

export default PaneOrganizer;
