import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import Resource from './Resource';
import CollapseContainer from '../../RecycleComponents/CollapseContainer';
import {arrowDownIcon, arrowRightIcon, folderIcon} from '../../../icons/icons';
import {Icon, IconButton} from '../../../styles/components/icon';
import {
	ResourceItemTitle,
	ResourceItem,
} from '../../../styles/components/navigationBar';
import {
	remoteResourceAction,
	remoteResourceSelector,
} from '../../../reducers/remoteResource';

const ResourceGroup = ({open, data, indent}) => {
	const dispatch = useDispatch();
	const {selectedResource} = useSelector(remoteResourceSelector.all);

	const [isFolderUnfolded, setIsFolderUnfolded] = useState(false);

	const onClickResourceGroup = useCallback(() => {
		if (selectedResource === data.key) {
			dispatch(remoteResourceAction.setSelectedResource(null));
		} else {
			dispatch(remoteResourceAction.setSelectedResource(data.key));
		}
	}, [selectedResource, data.key, dispatch]);

	const onClickFoldOrUnfoldResourceGroup = useCallback(() => {
		setIsFolderUnfolded(!isFolderUnfolded);
	}, [isFolderUnfolded]);

	useEffect(() => {
		setIsFolderUnfolded(open);
	}, [open]);

	return (
		<React.Fragment>
			<ResourceItem
				onClick={onClickResourceGroup}
				selected={selectedResource === data.key}
				left={(indent * 11 + 8).toString() + 'px'}
			>
				<Icon
					margin_right={'12px'}
					size={'sm'}
					itype={
						selectedResource === data.key ? 'selected' : undefined
					}
				>
					{folderIcon}
				</Icon>

				<ResourceItemTitle>{data.name}</ResourceItemTitle>
				<IconButton
					size={'sm'}
					margin={'0px 0px 0px 12px'}
					onClick={onClickFoldOrUnfoldResourceGroup}
				>
					{isFolderUnfolded ? arrowDownIcon : arrowRightIcon}
				</IconButton>
			</ResourceItem>
			{data.contain.length !== 0 && (
				<CollapseContainer isOpened={isFolderUnfolded}>
					<React.Fragment>
						{data.contain.map((i) =>
							i.type === 'folder' ? (
								<ResourceGroup
									key={i.key}
									open={open}
									data={i}
									indent={indent + 1}
								/>
							) : (
								<Resource
									key={i.key}
									data={i}
									indent={indent + 1}
								/>
							),
						)}
					</React.Fragment>
				</CollapseContainer>
			)}
		</React.Fragment>
	);
};

ResourceGroup.propTypes = {
	open: PropTypes.bool.isRequired,
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default ResourceGroup;
