import { FormEvent } from 'react';

interface IDeleteConfirmationModal {
	text: string;
	isSubmitting: boolean;
	handleSubmit: (evt: FormEvent<HTMLFormElement>) => void;
	onClose: () => void;
}

export default function DeleteConfirmationModal({
	text,
	isSubmitting,
	onClose,
	handleSubmit,
}: IDeleteConfirmationModal) {
	return (
		<form
			className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
			onSubmit={handleSubmit}
			data-test="delete-confirmation-modal-form"
		>
			<div className="w-full max-w-sm p-6 mx-4 bg-white rounded-xl dark:bg-background-dark">
				<div className="flex flex-col items-center text-center">
					<div className="flex items-center justify-center w-16 h-16 mb-4 text-red-500 bg-red-100 rounded-full dark:bg-red-500/20">
						<span className="text-4xl material-symbols-outlined">delete</span>
					</div>
					<h2 className="text-xl font-bold text-gray-900 dark:text-white">{text}</h2>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
					Are you sure you want to delete it? This action cannot be undone.
					</p>
				</div>
				<div className="flex justify-end mt-6 space-x-4">
					<button
						className="px-5 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg dark:bg-background-dark/30 dark:text-gray-300"
						onClick={() => onClose()}
						data-test="delete-confirmation-modal-cancel"
					>
						Cancel
					</button>
					<button
						disabled={isSubmitting}
						className="px-5 py-3 w-32 text-center text-sm font-medium text-white bg-red-600 rounded-lg disabled:opacity-20"
						data-test="delete-confirmation-modal-delete"
					>
						{isSubmitting ? 'Deleting...' : 'Confirmation'}
					</button>
				</div>
			</div>
		</form>
	);
}
