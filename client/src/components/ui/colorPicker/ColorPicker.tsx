import styles from './colorPicker.module.css';
import { HexColorPicker } from 'react-colorful';
import { FC, memo, useCallback, useRef, useState } from 'react';
import { useClickOutside } from '@/hooks';
import { TColorPickerProps } from '@/components';

const ColorPicker: FC<TColorPickerProps> = memo(({ color, onChange }) => {
	const popover = useRef<HTMLDivElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const close = useCallback(() => setIsOpen(false), []);
	useClickOutside(popover, close);

	return (
		<div className={styles.colorPicker}>
			<div
				className={styles.colorPickerSwatch}
				style={{ backgroundColor: color }}
				onClick={() => setIsOpen(true)}
			/>
			{isOpen && (
				<div className={styles.colorPickerPopover} ref={popover}>
					<HexColorPicker color={color} onChange={onChange} />
				</div>
			)}
		</div>
	);
});

export default ColorPicker;
