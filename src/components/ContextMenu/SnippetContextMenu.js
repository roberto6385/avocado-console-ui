import React, {useCallback, useMemo} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {animation, Item, Separator} from 'react-contexify';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {SSH_SEND_COMMAND_REQUEST} from '../../reducers/ssh';
import {DropDownMenu} from '../../styles/components/contextMenu';
import {dialogBoxAction} from '../../reducers/dialogBoxs';
import {tabBarSelector} from '../../reducers/tabBar';

const SnippetContextMenu = ({uuid}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('snippets');
	const {selectedTab} = useSelector(tabBarSelector.all);
	const {ssh, snippets} = useSelector((state) => state.ssh, shallowEqual);

	const ws = useMemo(
		() => ssh.find((v) => v.uuid === selectedTab)?.ws,
		[ssh, selectedTab],
	);

	const onClickOpenSnippets = useCallback(() => {
		dispatch(dialogBoxAction.openForm({key: 'snippet'}));
	}, [dispatch]);

	const menuEvent = useCallback(
		(v) => () => {
			ws &&
				dispatch({
					type: SSH_SEND_COMMAND_REQUEST,
					payload: {
						uuid: selectedTab,
						ws: ws,
						input: v.content,
						focus: true,
					},
				});
		},
		[dispatch, selectedTab, ws],
	);

	return (
		<DropDownMenu id={uuid + 'snippet'} animation={animation.slide}>
			<Item id='open_snippet' onClick={onClickOpenSnippets}>
				{t('editSnippets')}
			</Item>
			<Separator />
			{snippets.map((v, i) => {
				return (
					<Item key={i} id={v.name} onClick={menuEvent(v)}>
						{v.name}
					</Item>
				);
			})}
		</DropDownMenu>
	);
};

SnippetContextMenu.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SnippetContextMenu;
