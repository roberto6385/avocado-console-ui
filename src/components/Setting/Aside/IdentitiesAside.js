import React, {useCallback} from 'react';
import styled from 'styled-components';
import {
	ACCOUNT_BUTTON_WIDTH,
	GREEN_COLOR,
	AVOCADO_FONTSIZE,
	AVOCADO_HOVER_COLOR,
	IconButton,
	PATH_SEARCH_INPUT_HEIGHT,
	RIGHT_SIDE_WIDTH,
	THIRD_HEIGHT,
	fontColor,
	iconColor,
	borderColor,
} from '../../../styles/global';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {deleteIconMidium} from '../../../icons/icons';
import {useTranslation} from 'react-i18next';

const _Container = styled.div`
	width: ${RIGHT_SIDE_WIDTH};
	display: flex;
	flex-direction: column;
	align-items: center;
	color: ${(props) => props.color};
`;

const _Li = styled.li`
	width: ${RIGHT_SIDE_WIDTH};
	height: ${THIRD_HEIGHT};
	display: flex;
	align-items: center;
	border-bottom: 1px solid;
	border-color: ${(props) => props.b_color};
`;

const _AccountContainer = styled.div`
	width: 109px;
	display: flex;
	align-items: center;
	padding: 6px 16px;
`;
const _AuthenticationContainer = styled(_AccountContainer)`
	width: 142px;
`;
const _ButtonContainer = styled(_AccountContainer)`
	justify-content: center;
	padding: 0;
	width: 49px;
`;

const _Span = styled.span`
	font-size: ${AVOCADO_FONTSIZE};
`;

const _Button = styled.button`
	width: ${ACCOUNT_BUTTON_WIDTH};
	height: ${PATH_SEARCH_INPUT_HEIGHT};
	border: none;
	background: ${GREEN_COLOR};
	border-radius: 4px;
	font-size: ${AVOCADO_FONTSIZE};
	color: white;
	margin-top: 34px;
	&:hover {
		background: ${AVOCADO_HOVER_COLOR};
	}
`;

const IdentitiesAside = () => {
	const {t} = useTranslation('identitiesAside');
	const {account, theme} = useSelector((state) => state.common);
	const history = useHistory();

	const changePath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[],
	);
	return (
		<_Container color={fontColor[theme]}>
			<ul>
				<_Li b_color={borderColor[theme]}>
					<_AccountContainer>
						<_Span>{t('account')}</_Span>
					</_AccountContainer>
					<_AuthenticationContainer>
						<_Span>{t('auth')}</_Span>
					</_AuthenticationContainer>
					<_ButtonContainer />
				</_Li>
				{account.map((item) => {
					return (
						<_Li key={item.id} b_color={borderColor[theme]}>
							<_AccountContainer>
								<_Span>{item.name}</_Span>
							</_AccountContainer>
							<_AuthenticationContainer>
								<_Span>{item.type}</_Span>
							</_AuthenticationContainer>
							<_ButtonContainer>
								<IconButton color={iconColor[theme]}>
									{deleteIconMidium}
								</IconButton>
							</_ButtonContainer>
						</_Li>
					);
				})}
			</ul>
			<_Button onClick={changePath('/identities')}>
				{t('editMore')}
			</_Button>
		</_Container>
	);
};

export default IdentitiesAside;
