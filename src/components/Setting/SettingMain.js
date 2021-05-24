import React from 'react';
import styled from 'styled-components';
import SettingNav from './SettingNav';
import AccountSetting from '../AccountSetting';

const _Container = styled.div`
	display: flex;
	overflow: hidden;
	flex: 1;
`;

const SettingMain = () => {
	return (
		<_Container>
			<SettingNav />
			<AccountSetting />
		</_Container>
	);
};

export default SettingMain;
