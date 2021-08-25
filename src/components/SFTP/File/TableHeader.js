import React, {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {sftpAction, sftpSelector} from '../../../reducers/renewal';

const _Tr = styled.tr`
	top: 0px;
	height: 48px;
	background: ${(props) =>
		props.theme.pages.webTerminal.main.panels.sftp.backgroundColor};
	display: flex;
	align-items: center;
	padding-left: 16px;
	border-bottom: 1px solid;
	border-color: ${(props) =>
		props.theme.pages.webTerminal.main.panels.sftp.border.color};
`;

const _Th = styled.th`
	cursor: pointer;
	margin-right: 16px;
	min-width: ${(props) => props?.min};
	flex: ${(props) => props.flex};
	border: none !important;
	text-align: ${(props) => props.textAlign || 'left'};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 2;
	color: ${(props) =>
		props.active &&
		props.theme.basic.pages.icons.dynamicIcons.selected.font.color};
`;

const _Thead = styled.thead`
	position: sticky;
	top: 0px;
	z-index: 2;
	min-width: 778px;
`;

const TableHeader = ({uuid}) => {
	const {t} = useTranslation('fileListContent');
	const dispatch = useDispatch();
	const {data} = useSelector(sftpSelector.all);
	const sftp = useMemo(() => data.find((v) => v.uuid === uuid), [data, uuid]);

	const tableHeaders = [
		{title: t('name'), key: 'name', min: '142px', flex: 1},
		{title: t('size'), key: 'size', min: '135px'},
		{title: t('modified'), key: 'modified', min: '212px'},
		{title: t('permission'), key: 'permission', min: '105px'},
		{title: '', key: '', min: '63px'},
	];

	const onSortList = useCallback(
		(key) => () => {
			dispatch(sftpAction.setSort({uuid, type: key}));
		},
		[dispatch, uuid],
	);

	return (
		<_Thead>
			<_Tr>
				{tableHeaders.map((item) => {
					return (
						<_Th
							key={item.key}
							active={sftp.sort.type === item.key}
							textAlign={item.key === 'size' && 'right'}
							onClick={onSortList(item.key)}
							min={item.min}
							flex={item.flex}
						>
							{item.title}
						</_Th>
					);
				})}
			</_Tr>
		</_Thead>
	);
};

TableHeader.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default TableHeader;
