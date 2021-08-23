import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import Resource from './Resource';
import ResourceGroup from './ResourceGroup';
import {ResourceTreeContainer} from '../../../styles/components/navigationBar';
import {startCreatingTree} from '../../../utils/searchTree';
import {remoteResourceSelector} from '../../../reducers/remoteResource';

const ResourceTree = ({searchVal}) => {
	const {resourceTree} = useSelector(remoteResourceSelector.all);

	return (
		<ResourceTreeContainer>
			{(searchVal.length > 0
				? startCreatingTree(resourceTree, searchVal)
				: resourceTree
			).map((data) =>
				data.type === 'resourceGroup' ? (
					<ResourceGroup
						key={data.id}
						data={data}
						open={searchVal !== ''}
						indent={1}
					/>
				) : (
					<Resource key={data.id} data={data} indent={1} />
				),
			)}
		</ResourceTreeContainer>
	);
};

ResourceTree.propTypes = {
	searchVal: PropTypes.string.isRequired,
	setSearch: PropTypes.func,
};

export default ResourceTree;
