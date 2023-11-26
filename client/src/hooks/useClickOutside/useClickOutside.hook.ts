import { RefObject, useEffect } from 'react';

const useClickOutside = <T extends HTMLElement>(
	ref: RefObject<T>,
	handler: (event: MouseEvent) => void
) => {
	useEffect(() => {
		let startedInside: boolean | null = false;
		let startedWhenMounted: null | T | boolean = false;

		const listener = (event: MouseEvent) => {
			if (startedInside || !startedWhenMounted) {
				return;
			}
			if (!ref.current || ref.current.contains(event.target as Node)) {
				return;
			}

			handler(event);
		};

		const validateEventStart = (event: TouchEvent | MouseEvent) => {
			startedWhenMounted = ref.current;

			if (ref.current) {
				const target =
					'touches' in event
						? (event as TouchEvent).touches[0].target
						: (event as MouseEvent).target;
				startedInside = ref.current.contains(target as Node);
			}
		};

		document.addEventListener('mousedown', validateEventStart);
		document.addEventListener('touchstart', validateEventStart);
		document.addEventListener('click', listener);

		return () => {
			document.removeEventListener('mousedown', validateEventStart);
			document.removeEventListener('touchstart', validateEventStart);
			document.removeEventListener('click', listener);
		};
	}, [ref, handler]);
};

export default useClickOutside;
