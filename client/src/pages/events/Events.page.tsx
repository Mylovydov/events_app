import { BaseTable } from '@/components';

const mockColumns = [
	{ label: 'Name', accessor: 'name' },
	{ label: 'Last', accessor: 'last', sortable: true }
];

// const mockEvents: TEvent[] = [];

const EventsPage = () => {
	return (
		<div>
			<BaseTable
				tableData={[]}
				columns={mockColumns}
				onSortDirectionChange={() => {}}
				sortDirection="desc"
				sortKey="last"
			/>
		</div>
	);
};

export default EventsPage;
