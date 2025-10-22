import { IOrder, Status } from '@oms/common-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import NavBar from '@/components/navbar/NavBar';
import OrderCard from '@/components/order/OrderCard';
import OrderDeleteForm from '@/components/order/OrderDeleteForm';
import OrderUpdateForm from '@/components/order/OrderUpdateForm';
import Button from '@/components/ui/Button/Button';
import { SelectField } from '@/components/ui/Form/SelectField';
import { STATUS } from '@/constants/order/order-status.constant';
import useGetOrders from '@/hooks/order/useGetOrders';
import { ActiveMode } from '@/interfaces/common/action-mode.type';

const ORDER_ALL_LABEL = 'Filter By Status';

export default function Home() {
	const [searchParams, setSearchParams] = useSearchParams();
	const pageNumber = searchParams.get('page[number]') || 1;
	const status = (searchParams.get('status') as Status) || undefined;
	const { data, isLoading, refetch } = useGetOrders({
		page: {
			number: Number(pageNumber),
		},
		filter: { status },
	});
	const [activeMode, setActiveMode] = useState<ActiveMode>('None');
	const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

	const currentPage = data?.meta?.pageNumber ?? 1;
	const totalPages = data?.meta?.pageCount ?? 1;

	const isPrevDisabled = currentPage <= 1;
	const isNextDisabled = currentPage >= totalPages;

	useEffect(() => {
		refetch();
	}, [searchParams, refetch]);

	const handleEdit = useCallback((order: IOrder) => {
		setSelectedOrder(order);
		setActiveMode('Update');
	}, []);

	const handleDelete = useCallback((order: IOrder) => {
		setSelectedOrder(order);
		setActiveMode('Delete');
	}, []);

	const handlePrevPage = useCallback(() => {
		if (isPrevDisabled) return;
		setSearchParams({ ['page[number]']: String(Number(pageNumber) - 1) });
	}, [isPrevDisabled]);

	const handleNextPage = useCallback(() => {
		if (isNextDisabled) return;
		setSearchParams({ ['page[number]']: String(Number(pageNumber) + 1) });
	}, [isNextDisabled]);

	const handleFilterChange = useCallback((evt: React.ChangeEvent<HTMLSelectElement>) => {
		const statusValue =
			evt.target.value === ORDER_ALL_LABEL ? undefined : (evt.target.value as Status);
		if (statusValue) {
			setSearchParams({ ['page[number]']: '1', status: statusValue });
		}
	}, []);

	const orders = useMemo(() => data?.data ?? [], [data]);

	return (
		<>
			<NavBar />

			<main className="flex flex-col h-full items-center justify-between p-2 w-full">
				<div className="w-full h-full max-w-5xl flex flex-col justify-between items-center gap-4">
					<SelectField
						dataTest="home-filter"
						name="status"
						onChange={handleFilterChange}
						options={[ORDER_ALL_LABEL, ...STATUS]}
						value={status ?? ORDER_ALL_LABEL}
					/>

					<section className="w-full flex flex-wrap justify-center gap-4">
						{isLoading ? (
							Array.from({ length: 2 }, (_, i) => (
								<div key={i} className="skeleton w-full max-w-64 h-32" />
							))
						) : orders.length > 0 ? (
							orders.map((order) => (
								<OrderCard
									key={order.id}
									order={order}
									handleEdit={handleEdit}
									handleDelete={handleDelete}
								/>
							))
						) : (
							<div className="flex-1 text-lg font-bold text-center text-gray-900 dark:text-white">
								There are no orders yet.
							</div>
						)}
					</section>

					<footer className="w-full flex justify-center mt-4">
						<div className="p-4 flex justify-between items-center w-full max-w-5xl bg-background-light dark:bg-background-dark rounded-lg">
							<div className="max-w-36 w-full">
								<Button
									className="w-full max-w-20"
									dataTest="home-button-prev"
									onClick={handlePrevPage}
									text="Prev"
									isDisabled={isPrevDisabled}
								/>
							</div>
							<span className="dark:text-white text-black">
								{currentPage} / {totalPages}
							</span>
							<div className="max-w-36 w-full">
								<Button
									className="w-full max-w-20"
									dataTest="home-button-next"
									onClick={handleNextPage}
									text="Next"
									isDisabled={isNextDisabled}
								/>
							</div>
						</div>
					</footer>

					{activeMode === 'Update' && selectedOrder && (
						<OrderUpdateForm onClose={() => setActiveMode('None')} order={selectedOrder} />
					)}
					{activeMode === 'Delete' && selectedOrder && (
						<OrderDeleteForm onClose={() => setActiveMode('None')} order={selectedOrder} />
					)}
				</div>
			</main>
		</>
	);
}
