import {useCallback, useRef} from 'react';

export const useDoubleClickParam = (doubleClick, click, timeout = 200) => {
	const clickTimeout = useRef();

	const clearClickTimeout = () => {
		if (clickTimeout) {
			clearTimeout(clickTimeout.current);
			clickTimeout.current = undefined;
		}
	};

	return useCallback(
		(i) => (e) => {
			clearClickTimeout();
			if (click && e.detail === 1) {
				clickTimeout.current = setTimeout(() => {
					click(i, e);
				}, timeout);
			}
			if (e.detail % 2 === 0) doubleClick(i, e);
		},
		[click, doubleClick, timeout],
	);
};
