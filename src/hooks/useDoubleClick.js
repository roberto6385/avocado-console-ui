import {useCallback, useRef} from 'react';

export const useDoubleClick = (doubleClick, click, timeout = 200) => {
	const clickTimeout = useRef();

	const clearClickTimeout = () => {
		if (clickTimeout) {
			clearTimeout(clickTimeout.current);
			clickTimeout.current = undefined;
		}
	};

	return useCallback(
		(e) => {
			clearClickTimeout();
			if (click && e.detail === 1) {
				clickTimeout.current = setTimeout(() => {
					click(e);
				}, timeout);
			}
			if (e.detail % 2 === 0) doubleClick(e);
		},
		[click, doubleClick],
	);
};
