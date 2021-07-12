import Pane from './Pane';
import React from 'react';
import PropTypes from 'prop-types';
import SplitPane from 'react-split-pane';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

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

const Panes = ({tab}) => {
	const theme = useSelector((state) => state.common.theme);
	return (
		<_Container>
			{tab.length === 1 && (
				<Pane
					uuid={tab[0].uuid}
					type={tab[0].type}
					server={tab[0].server}
				/>
			)}
			{tab.length === 2 && (
				<SplitPane
					split='vertical'
					className={theme === 0 ? 'backWhite' : 'backBlack'}
					defaultSize={'50%'}
				>
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
			)}
			{tab.length === 3 && (
				<SplitPane
					split='vertical'
					className={theme === 0 ? 'backWhite' : 'backBlack'}
					defaultSize={'66%'}
				>
					<SplitPane
						split='vertical'
						className={theme === 0 ? 'backWhite' : 'backBlack'}
						defaultSize={'50%'}
					>
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
			)}
			{tab.length === 4 && (
				<SplitPane
					split='vertical'
					className={theme === 0 ? 'backWhite' : 'backBlack'}
					defaultSize={'75%'}
				>
					<SplitPane
						split='vertical'
						className={theme === 0 ? 'backWhite' : 'backBlack'}
						defaultSize={'66%'}
					>
						<SplitPane
							split='vertical'
							className={theme === 0 ? 'backWhite' : 'backBlack'}
							defaultSize={'50%'}
						>
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
			)}
			{tab.length === 5 && (
				<SplitPane
					split='vertical'
					className={theme === 0 ? 'backWhite' : 'backBlack'}
					defaultSize={'80%'}
				>
					<SplitPane
						split='vertical'
						className={theme === 0 ? 'backWhite' : 'backBlack'}
						defaultSize={'75%'}
					>
						<SplitPane
							split='vertical'
							className={theme === 0 ? 'backWhite' : 'backBlack'}
							defaultSize={'66%'}
						>
							<SplitPane
								split='vertical'
								className={
									theme === 0 ? 'backWhite' : 'backBlack'
								}
								defaultSize={'50%'}
							>
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
			)}
		</_Container>
	);
};

Panes.propTypes = {
	tab: PropTypes.array.isRequired,
};

export default Panes;
