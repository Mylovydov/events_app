import styles from './colorPicker.module.css';
import { HexColorPicker } from 'react-colorful';
import { FC, useCallback, useRef, useState } from 'react';
import { useClickOutside } from '@/hooks';
import { TColorPickerProps } from '@/components';

const ColorPicker: FC<TColorPickerProps> = ({ color, onChange }) => {
	const popover = useRef<HTMLDivElement | null>(null);
	const [isOpen, toggle] = useState(false);

	const close = useCallback(() => toggle(false), []);
	useClickOutside(popover, close);

	return (
		<div className={styles.colorPicker}>
			<div
				className={styles.colorPickerSwatch}
				style={{ backgroundColor: color }}
				onClick={() => toggle(true)}
			/>
			{isOpen && (
				<div className={styles.colorPickerPopover} ref={popover}>
					<HexColorPicker color={color} onChange={onChange} />
				</div>
			)}
		</div>
	);
};

export default ColorPicker;
