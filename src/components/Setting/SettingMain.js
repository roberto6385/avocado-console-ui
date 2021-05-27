import React from 'react';
import styled from 'styled-components';
import SettingNav from './SettingNav';
import AccountSpace from './AccountSpace';

const _Container = styled.div`
	display: flex;
	overflow: hidden;
	flex: 1;
`;

const SettingMain = () => {
	return (
		<_Container>
			<SettingNav />
			<AccountSpace />
		</_Container>
	);
};

export default SettingMain;
