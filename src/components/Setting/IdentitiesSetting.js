import React from 'react';
import styled from 'styled-components';
import {
	AVOCADO_FONTSIZE,
	BORDER_COLOR,
	IconButton,
	LIGHT_BACKGROUND_COLOR,
	ROBOTO,
	SUB_HEIGHT,
	THIRD_HEIGHT,
} from '../../styles/global_design';
import {useSelector} from 'react-redux';

const _Container = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	padding: 0px 16px;
	background: ${LIGHT_BACKGROUND_COLOR};
`;

const _Title = styled.div`
	display: flex;
	align-items: center;
	height: ${SUB_HEIGHT};
	border-bottom: 1px solid ${BORDER_COLOR};
`;

const _ContentContainer = styled.div`
	display: flex;
`;

const _Li = styled.li`
	width: 100%;
	height: ${THIRD_HEIGHT};
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid ${BORDER_COLOR};
	font-weight: ${(props) => props.weight};
	font-family: ${ROBOTO};
	letter-spacing: 0.14px;
`;

const _Name = styled.div`
	width: 298px;
	display: flex;
	align-items: center;
	padding: 6px 16px;
`;
const _UserNameType = styled(_Name)`
	width: 266px;
`;
const _ButtonContainer = styled(_Name)`
	justify-content: center;
	padding: 0;
	width: 126px;
`;

const _Span = styled.span`
	font-size: ${AVOCADO_FONTSIZE};
`;

const _AccountListUl = styled.ul`
	border: 1px solid ${BORDER_COLOR};
	background: white;
	min-width: 1016px;
`;

const IdentitiesSetting = () => {
	const {account} = useSelector((state) => state.common);

	return (
		<_Container>
			<_Title>Identities</_Title>
			<_ContentContainer>
				<_AccountListUl>
					<_Li weight={'bold'}>
						<_Name>[ Cloud Server ] Account List</_Name>
					</_Li>
					<_Li weight={'bold'}>
						<_Name>
							<_Span>Name</_Span>
						</_Name>
						<_UserNameType>
							<_Span>User Name</_Span>
						</_UserNameType>
						<_UserNameType>
							<_Span>Type</_Span>
						</_UserNameType>
						<_ButtonContainer>Edit</_ButtonContainer>
					</_Li>
					{account.map((item) => {
						return (
							<_Li key={item.id}>
								<_Name>
									<_Span>{item.name}</_Span>
								</_Name>
								<_UserNameType>
									<_Span>{item.username}</_Span>
								</_UserNameType>
								<_UserNameType>
									<_Span>{item.type}</_Span>
								</_UserNameType>
								<_ButtonContainer>
									<IconButton>
										<span className='material-icons button_large'>
											edit
										</span>
									</IconButton>
									<IconButton>
										<span className='material-icons button_midium'>
											delete
										</span>
									</IconButton>
								</_ButtonContainer>
							</_Li>
						);
					})}
				</_AccountListUl>
			</_ContentContainer>
		</_Container>
	);
};

export default IdentitiesSetting;
