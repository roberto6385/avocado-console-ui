import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import AccountSpace from '../components/Setting/Space/AccountSpace';
import SettingAppLayout from '../components/Layouts/SettingLayout';
import {authSelector} from '../reducers/api/auth';
import i18n from 'i18next';
import {settingSelector} from '../reducers/setting';

const Account = () => {
	const {userData} = useSelector(authSelector.all);
	const {language} = useSelector(settingSelector.all);
	const history = useHistory();

	useEffect(() => {
		if (!userData) {
			history.push('/signin');
			location.reload();
		}
	}, [history, language, userData]);

	useEffect(() => {
		i18n.changeLanguage(language);
	}, [i18n, language]);

	return (
		<SettingAppLayout>
			<AccountSpace />
		</SettingAppLayout>
	);
};

export default Account;
