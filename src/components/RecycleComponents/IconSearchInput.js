import React from 'react';
import styled from 'styled-components';
import {Icon} from '../../styles/components/icon';
import PropTypes from 'prop-types';
import {SearchInput} from '../../styles/components/input';
import {searchIcon} from '../../icons/icons';

const Container = styled.div`
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

const SearchInput_ = styled(SearchInput)`
	height: 28px;
	font-size: ${(props) => props.size || '14px'};
	padding: 0px 4px;
`;

const IconSearchInput = ({value, onChange, place = '', size, height}) => {
	return (
		<Container height={height}>
			<Icon size={'sm'} margin_right={'0px'}>
				{searchIcon}
			</Icon>
			<SearchInput_
				size={size}
				onChange={onChange}
				value={value}
				type='text'
				placeholder={place}
			/>
		</Container>
	);
};

IconSearchInput.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	onChange: PropTypes.func.isRequired,
	place: PropTypes.string,
	width: PropTypes.string,
	height: PropTypes.string,
	size: PropTypes.string,
};

export default IconSearchInput;
