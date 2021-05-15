import React from 'react';
import styled from 'styled-components';
import {FOOTER_HEIGHT} from '../../styles/global_design';

const Footer_Container = styled.footer`
	height: ${FOOTER_HEIGHT};
`;

const Footer = () => {
	return <Footer_Container>footer</Footer_Container>;
};

export default Footer;
