import {useState, useMemo} from 'react';
import useResizeObserver from 'use-resize-observer';
import _ from 'lodash-es';

export const useDebouncedResizeObserver = (wait) => {
	const [size, setSize] = useState({});
	const onResize = useMemo(() => _.debounce(setSize, wait, {leading: true}), [
		wait,
	]);
	const {ref} = useResizeObserver({onResize});

	return {ref, ...size};
};
