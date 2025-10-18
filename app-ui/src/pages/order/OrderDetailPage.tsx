import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import OrderDeleteForm from '@/components/order/OrderDeleteForm';
import OrderDetailRow from '@/components/order/OrderDetailRow';
import OrderUpdateForm from '@/components/order/OrderUpdateForm';
import Button from '@/components/ui/Button/Button';
import useGetOneOrder from '@/hooks/order/useGetOneOrder';
import { ActiveMode } from '@/interfaces/common/action-mode.type';

export default function OrderDetailPage() {
	const [activeMode, setActiveMode] = useState<ActiveMode>('None');
	const { id } = useParams();
	const { data } = useGetOneOrder(id);
	return (
		<div className="w-full max-w-[640px]">
			<header className="sticky top-0 z-10 flex items-center justify-between border-b border-border-light bg-background-light/80 px-4 py-3 backdrop-blur-sm dark:border-border-dark dark:bg-background-dark/80">
				<Link to="/" className="text-foreground-light dark:text-foreground-dark">
					<svg
						fill="currentColor"
						height="24"
						viewBox="0 0 256 256"
						width="24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
					</svg>
				</Link>
				<h1
					className="text-lg font-bold text-foreground-light dark:text-foreground-dark"
					data-test="order-detail-title"
				>
					Order Detail
				</h1>
				<div className="w-6" />
			</header>
			<main className="p-4">
				<section className="mb-6 rounded-lg bg-background-light dark:bg-background-dark">
					<div className="divide-y divide-border-light dark:divide-border-dark">
						<OrderDetailRow dataTest="order-detail-row-id" label="Order ID" value={data?.data.id} />
						<OrderDetailRow
							dataTest="order-detail-row-customer-name"
							label="Client Name"
							value={data?.data.customerName}
						/>
						<OrderDetailRow dataTest="order-detail-row-item" label="Item" value={data?.data.item} />
						<OrderDetailRow
							dataTest="order-detail-row-quantity"
							label="Quantity"
							value={data?.data.quantity}
						/>
						<OrderDetailRow
							dataTest="order-detail-row-status"
							label="Status"
							value={data?.data.status}
						/>
					</div>
				</section>
				<section>
					<div className="space-y-3 flex flex-col items-center justify-center">
						<Button
							onClick={() => setActiveMode('Update')}
							text="Edit Order"
							dataTest="order-detail-button-edit"
						/>
						<Button
							onClick={() => setActiveMode('Delete')}
							text="Delete Order"
							dataTest="order-detail-button-edit"
						/>
					</div>
				</section>
			</main>
			{activeMode === 'Update' && data?.data && (
				<OrderUpdateForm onClose={() => setActiveMode('None')} order={data.data} />
			)}
			{activeMode === 'Delete' && data?.data && (
				<OrderDeleteForm onClose={() => setActiveMode('None')} order={data.data} />
			)}
		</div>
	);
}
