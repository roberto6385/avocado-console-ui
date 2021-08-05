import React from 'react';
import styled from 'styled-components';
import {Icon} from '../../styles/components/icon';
import PropTypes from 'prop-types';

const InputWithIconContainer = styled.div`
	display: flex;
	align-items: center;
	width: ${(props) => props.width || '100%'};
	height: ${(props) => props.height || '30px'};
	padding: 12px 10px;
	border-radius: 4px;

	background: ${(props) =>
		props.theme.basic.pages.textBoxs.searchStyle.backgroundColor};
	border: 1px solid;
	border-color: ${(props) =>
		props.theme.basic.pages.textBoxs.normalStyle.border.color};
`;
const InputWithIcon = styled.input`
	width: 100%;
	padding: 6px 4px;
	border: 1px solid;
	border-color: ${(props) =>
		props.theme.basic.pages.textBoxs.searchStyle.border.color};
	border-radius: 4px;
	font-size: 14px;
	background: transparent;
	color: ${(props) =>
		props.theme.basic.pages.textBoxs.searchStyle.font.color};
`;

const Icon_ = styled(Icon)`
	margin: 0px;
`;

const IconTextBox_ = ({
	icon,
	value,
	size = '',
	onChange,
	place = '',
	height,
}) => {
	return (
		<InputWithIconContainer height={height}>
			<Icon_ size={size} margin_right={'6px'}>
				{icon}
			</Icon_>
			<InputWithIcon
				onChange={onChange}
				value={value}
				type='text'
				placeholder={place}
			/>
		</InputWithIconContainer>
	);
};

IconTextBox_.propTypes = {
	icon: PropTypes.element.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	onChange: PropTypes.func.isRequired,
	place: PropTypes.string,
	size: PropTypes.string,
	width: PropTypes.string,
	height: PropTypes.string,
};

export default IconTextBox_;
