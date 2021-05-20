import React, {useCallback} from 'react';
import styled from 'styled-components';
import {BORDER_COLOR, SIDE_WIDTH, SUB_HEIGHT} from '../../styles/global_design';
import {RiArrowLeftSLine} from 'react-icons/all';
import {useHistory} from 'react-router-dom';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: ${SIDE_WIDTH};
	min-width: ${SIDE_WIDTH};
	border-right: 1px solid ${BORDER_COLOR};
`;

const Back_Container = styled.div`
	display: flex;
	align-items: center;
	height: ${SUB_HEIGHT};
	padding: 0px 16px;
	border-bottom: 1px solid ${BORDER_COLOR};
	cursor: pointer;
`;

const Span = styled.span``;
const OtherPage_Container = styled.div`
	padding: 8px 0px;
`;

const Aside_Other = () => {
	const history = useHistory();

	const changePath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[],
	);

	return (
		<Container>
			<Back_Container onClick={changePath('/')}>
				<RiArrowLeftSLine
					style={{fontSize: '24px', marginRight: '5px'}}
				/>
				<Span>Back</Span>
			</Back_Container>
			<OtherPage_Container>

			</OtherPage_Container>
		</Container>
	);
};

export default Aside_Other;
