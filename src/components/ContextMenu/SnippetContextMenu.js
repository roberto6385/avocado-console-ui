import React, {useCallback, useMemo} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {animation, Item, Separator} from 'react-contexify';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {SSH_SEND_COMMAND_REQUEST} from '../../reducers/ssh';
import {DropDownMenu} from "../../styles/components/context-menu";

const SnippetContextMenu = ({uuid, setOpen}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('snippets');

	const {theme, current_tab} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const {ssh, snippets} = useSelector((state) => state.ssh, shallowEqual);

	const ws = useMemo(
		() => ssh.find((v) => v.uuid === current_tab)?.ws,
		[ssh, current_tab],
	);

	const onClickOpenSnippets = useCallback(() => {
		setOpen(true);
	}, [setOpen]);

	const menuEvent = useCallback(
		(v) => () => {
			ws &&
				dispatch({
					type: SSH_SEND_COMMAND_REQUEST,
					data: {
						uuid: current_tab,
						ws: ws,
						input: v.content,
						focus: true,
					},
				});
		},
		[current_tab, ws],
	);

	return (
		<DropDownMenu
			id={uuid + 'snippet'}
			animation={animation.slide}
			theme_value={theme}
		>
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
	setOpen: PropTypes.func.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default SnippetContextMenu;
