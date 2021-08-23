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
	const {selectedResource, resourceGroups} = useSelector(
		remoteResourceSelector.all,
	);

	const [isFolderUnfolded, setIsFolderUnfolded] = useState(false);

	const onClickResourceGroup = useCallback(() => {
		if (selectedResource === data.id) {
			dispatch(remoteResourceAction.setSelectedResource(null));
		} else {
			dispatch(remoteResourceAction.setSelectedResource(data.id));
		}
	}, [selectedResource, data.id, dispatch]);

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
				selected={selectedResource === data.id}
				left={(indent * 11 + 8).toString() + 'px'}
			>
				<Icon
					margin_right={'12px'}
					size={'sm'}
					itype={
						selectedResource === data.id ? 'selected' : undefined
					}
				>
					{folderIcon}
				</Icon>

				<ResourceItemTitle>
					{resourceGroups.find((v) => v.id === data.id).name}
				</ResourceItemTitle>
				<IconButton
					size={'sm'}
					margin={'0px 0px 0px 12px'}
					onClick={onClickFoldOrUnfoldResourceGroup}
				>
					{isFolderUnfolded ? arrowDownIcon : arrowRightIcon}
				</IconButton>
			</ResourceItem>
			{data.childern.length !== 0 && (
				<CollapseContainer isOpened={isFolderUnfolded}>
					<React.Fragment>
						{data.childern.map((v) =>
							v.type === 'resourceGroup' ? (
								<ResourceGroup
									key={v.id}
									open={open}
									data={v}
									indent={indent + 1}
								/>
							) : (
								<Resource
									key={v.id}
									data={v}
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
