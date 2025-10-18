import { IOrder, Status } from '@oms/common-types';
import { Link } from 'react-router-dom';

interface IOrderCardProps {
	order: IOrder;
	handleEdit: (order: IOrder) => void;
	handleDelete: (order: IOrder) => void;
}

export default function OrderCard({ order, handleEdit, handleDelete }: IOrderCardProps) {
	const colorStatus = {
		[Status.COMPLETED]: 'text-green-500',
		[Status.PENDING]: 'text-yellow-500',
		[Status.CANCELLED]: 'text-red-500',
	};
	return (
		<div data-test="order-card" className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow w-full max-w-64 h-32">
			<div className="flex justify-between items-start">
				<div>
					<p className="font-bold text-gray-900 dark:text-white">Client: {order.customerName}</p>
				</div>
				<div>
					<div className="text-left">
						<p className="font-medium text-gray-900 dark:text-white">{order.item}</p>
					</div>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						<span className={`font-medium ${colorStatus[order.status]} capitalize`}>
							{order.status}
						</span>
					</p>
				</div>
			</div>
			<div className="flex justify-between items-center gap-2">
				<div className="w-full">
					<Link
						to={`/order/${order.id}`}
						className="text-center block w-full bg-primary text-white py-2 rounded-lg text-sm font-medium"
					>
						View Details
					</Link>
				</div>
				<div className="flex items-center">
					<button
						className="flex justify-center items-center p-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
						onClick={() => handleEdit(order)}
						data-test="order-card-edit"
					>
						<span className="material-symbols-outlined">edit</span>
					</button>
					<button
						data-test="order-card-delete"
						className="flex justify-center items-center p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500"
						onClick={() => handleDelete(order)}
					>
						<span className="material-symbols-outlined">delete</span>
					</button>
				</div>
			</div>
		</div>
	);
}
