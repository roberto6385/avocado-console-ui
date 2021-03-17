import React, {useCallback} from 'react';
import styled from 'styled-components';
import background from '../images/bg_3.png';
import {MAIN_COLOR, WHITE_COLOR} from '../styles/global';

const Background = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 100%;
	background-image: url(${background});
	background-size: cover;
	background-position: center;
	position: relative;
`;

const AddServerButton = styled.button`
	background-color: ${MAIN_COLOR};
	&:hover {
		background-color: ${MAIN_COLOR};
		filter: brightness(85%);
	}
	padding: 10px 40px;
	border: none;
	color: ${WHITE_COLOR};
	border-radius: 8px;
	position: absolute;
	top: 60%;
`;

const MainPage = () => {
	const onClickVisibleForm = useCallback(() => {
		// document.getElementById('add-server-form').style.display = 'block';
	}, []);

	return (
		<Background>
			<AddServerButton onClick={onClickVisibleForm}>
				Add Server
			</AddServerButton>
		</Background>
	);
};

export default MainPage;
