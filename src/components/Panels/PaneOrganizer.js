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
					resourceId={tab[0].resourceId}
				/>
			)}
			{tab.length === 2 && (
				<SplitPane split='vertical' defaultSize={'50%'}>
					<Pane
						uuid={tab[0].uuid}
						type={tab[0].type}
						resourceId={tab[0].resourceId}
					/>
					<Pane
						uuid={tab[1].uuid}
						type={tab[1].type}
						resourceId={tab[1].resourceId}
					/>
				</SplitPane>
			)}
			{tab.length === 3 && (
				<SplitPane split='vertical' defaultSize={'66%'}>
					<SplitPane split='vertical' defaultSize={'50%'}>
						<Pane
							uuid={tab[0].uuid}
							type={tab[0].type}
							resourceId={tab[0].resourceId}
						/>
						<Pane
							uuid={tab[1].uuid}
							type={tab[1].type}
							resourceId={tab[1].resourceId}
						/>
					</SplitPane>
					<Pane
						uuid={tab[2].uuid}
						type={tab[2].type}
						resourceId={tab[2].resourceId}
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
								resourceId={tab[0].resourceId}
							/>
							<Pane
								uuid={tab[1].uuid}
								type={tab[1].type}
								resourceId={tab[1].resourceId}
							/>
						</SplitPane>
						<Pane
							uuid={tab[2].uuid}
							type={tab[2].type}
							resourceId={tab[2].resourceId}
						/>
					</SplitPane>
					<Pane
						uuid={tab[3].uuid}
						type={tab[3].type}
						resourceId={tab[3].resourceId}
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
									resourceId={tab[0].resourceId}
								/>
								<Pane
									uuid={tab[1].uuid}
									type={tab[1].type}
									resourceId={tab[1].resourceId}
								/>
							</SplitPane>
							<Pane
								uuid={tab[2].uuid}
								type={tab[2].type}
								resourceId={tab[2].resourceId}
							/>
						</SplitPane>
						<Pane
							uuid={tab[3].uuid}
							type={tab[3].type}
							resourceId={tab[3].resourceId}
						/>
					</SplitPane>
					<Pane
						uuid={tab[4].uuid}
						type={tab[4].type}
						resourceId={tab[4].resourceId}
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
