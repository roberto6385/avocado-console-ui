import React, {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {animation, Item, Separator} from 'react-contexify';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {DropDownMenu} from '../../styles/components/contextMenu';
import {dialogBoxAction} from '../../reducers/dialogBoxs';
import {tabBarSelector} from '../../reducers/tabBar';
import {sshAction, sshSelector} from '../../reducers/ssh';

const SnippetManagerContextMenu = ({uuid}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('snippetManagerContextMenu');
	const {selectedTab} = useSelector(tabBarSelector.all);
	const {ssh, snippets} = useSelector(sshSelector.all);

	const ws = useMemo(
		() => ssh.find((v) => v.uuid === selectedTab)?.ws,
		[ssh, selectedTab],
	);

	const onClickOpenSnippetsManegerDialogBox = useCallback(() => {
		dispatch(dialogBoxAction.openForm({key: 'snippet'}));
	}, [dispatch]);

	const handleOnClickEvents = useCallback(
		(v) => () => {
			ws &&
				dispatch(
					sshAction.sendCommandRequest({
						uuid: selectedTab,
						ws: ws,

						input: v.content,
						focus: true,
					}),
				);
		},

		[selectedTab, dispatch, ws],
	);

	return (
		<DropDownMenu
			id={uuid + '-snippets-context-menu'}
			animation={animation.slide}
		>
			<Item onClick={onClickOpenSnippetsManegerDialogBox}>
				{t('editSnippets')}
			</Item>
			<Separator />
			{snippets.map((v) => {
				return (
					<Item
						key={'snippets-manager-context-menu-' + v.name}
						onClick={handleOnClickEvents(v)}
					>
						{v.name}
					</Item>
				);
			})}
		</DropDownMenu>
	);
};

SnippetManagerContextMenu.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SnippetManagerContextMenu;
