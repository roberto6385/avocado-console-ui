import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import SettingAppLayout from '../components/Setting/SettingLayout';
import PreferencesSpace from '../components/Setting/Space/PreferencesSpace';
import {authSelector} from '../reducers/api/auth';
import i18n from 'i18next';
import {settingSelector} from '../reducers/setting';

const Preferences = () => {
	const history = useHistory();

	const {language} = useSelector(settingSelector.all);
	const {userData} = useSelector(authSelector.all);

	useEffect(() => {
		if (!userData) {
			history.push('/signin');
			location.reload();
		}
	}, [history, userData]);

	useEffect(() => {
		i18n.changeLanguage(language);
	}, [i18n, language]);

	return (
		<SettingAppLayout>
			<PreferencesSpace />
		</SettingAppLayout>
	);
};

export default Preferences;
