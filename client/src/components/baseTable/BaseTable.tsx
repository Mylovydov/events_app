import styles from './baseTable.module.css';
import { FC } from 'react';
import classNames from 'classnames';
import { EmptyTable, Spinner, TableHead, TBaseTableProps } from '@/components';

const BaseTable: FC<TBaseTableProps> = ({
	rows = [],
	isLoading,
	isLastColumnSticky,
	emptyLabel,
	...tableHeadProps
}) => {
	const hasContent = !!rows?.length;

	const baseTableClasses = classNames({
		[styles.baseTable]: true,
		[styles.baseTableSticky]: isLastColumnSticky && hasContent
	});

	const contentMarkup = hasContent && !isLoading && <tbody>{rows}</tbody>;

	const emptyTableMarkup = !hasContent && !isLoading && (
		<div className={styles.baseTableEmpty}>
			<EmptyTable>{emptyLabel}</EmptyTable>
		</div>
	);

	const loadingMarkup = isLoading && (
		<div className={styles.baseTableEmpty}>
			<Spinner />
		</div>
	);

	return (
		<div className={styles.baseTableWrapper}>
			<div className={styles.baseTableContainer}>
				<table className={baseTableClasses}>
					<TableHead {...tableHeadProps} />
					{contentMarkup}
				</table>
				{loadingMarkup}
				{emptyTableMarkup}
			</div>
		</div>
	);
};

export default BaseTable;
