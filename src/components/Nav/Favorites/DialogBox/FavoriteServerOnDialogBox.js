import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {Icon} from '../../../../styles/components/icon';
import {
	NavigationItem,
	NavigationItemTitle,
} from '../../../../styles/components/navigationBar';
import {awsServerIcon, linuxServerIcon} from '../../../../icons/icons';
import {CHANGE_SELEECTED_TEMP_FAVORITE} from '../../../../reducers/common';

const FavoriteServerOnDialogBox = ({data, indent}) => {
	const dispatch = useDispatch();
	const {selectedFavoriteItemOnDialogBox} = useSelector(
		(state) => state.common,
		shallowEqual,
	);

	const onClickFavoriteServerItem = useCallback(() => {
		if (selectedFavoriteItemOnDialogBox === data.key) {
			dispatch({type: CHANGE_SELEECTED_TEMP_FAVORITE, payload: null});
		} else {
			dispatch({type: CHANGE_SELEECTED_TEMP_FAVORITE, payload: data.key});
		}
	});

	return (
		<React.Fragment>
			<NavigationItem
				selected={selectedFavoriteItemOnDialogBox === data.key ? 1 : 0}
				left={(indent * 11 + 8).toString() + 'px'}
				onClick={onClickFavoriteServerItem}
			>
				<Icon
					size={'sm'}
					margin_right={'12px'}
					itype={
						selectedFavoriteItemOnDialogBox === data.key
							? 'selected'
							: undefined
					}
				>
					{data.icon === 'linux' && linuxServerIcon}
					{data.icon === 'aws' && awsServerIcon}
				</Icon>

				<NavigationItemTitle>{data.name}</NavigationItemTitle>
			</NavigationItem>
		</React.Fragment>
	);
};

FavoriteServerOnDialogBox.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default FavoriteServerOnDialogBox;
