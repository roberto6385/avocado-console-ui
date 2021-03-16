import {Button} from 'react-bootstrap';
import React, {useCallback} from 'react';
import styled from 'styled-components';

const Background = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: center;
	flex-direction: column;
	background-image: url('../pic/bg_3.png');
	background-position: center;
	background-size: cover;
	background-repeat: no-repeat;
	position: relative;
`;

const AddServerButton = styled(Button)`
	background-color: #116466;
	padding: 10px 40px;
	border: none;
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
