import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {sftpIconConvert} from '../../icons/icons';
import {HoverButton} from '../../styles/components/icon';
import {sftpAction} from '../../reducers/renewal';
import {tabBarSelector} from '../../reducers/tabBar';

const SFTPConnectBtn = ({uuid}) => {
	const dispatch = useDispatch();
	const {terminalTabs} = useSelector(tabBarSelector.all);
	const {resourceId} = terminalTabs.find((v) => v.uuid === uuid);

	const onClickConnectSftp = useCallback(() => {
		dispatch(
			sftpAction.connect({
				resourceId,
			}),
		);
	}, [resourceId, dispatch]);

	return (
		<HoverButton onClick={onClickConnectSftp}>
			{sftpIconConvert}
		</HoverButton>
	);
};

SFTPConnectBtn.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTPConnectBtn;
