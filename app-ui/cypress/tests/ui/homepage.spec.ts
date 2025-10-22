// https://docs.cypress.io/guides/overview/why-cypress
const orderId = 'f26937d6-b975-44b1-b135-135a05773da9'
describe('Home page', () => {
	beforeEach(() => {
		cy.intercept('GET', '**/order?page%5Bnumber%5D=1&page%5Bsize%5D=2', {
			fixture: 'order/order-response.json',
		});
		cy.visit('/');
	});

	it('Should render correctly', () => {
		cy.getBySel('navbar-title').should('be.visible').and('contain.text', 'Order');
		cy.getBySel('home-filter').should('be.visible').and('contain.text', 'Filter By Status');
		cy.getBySel('home-button-prev').should('be.visible').and('contain.text', 'Prev');
		cy.getBySel('home-button-next').should('be.visible').and('contain.text', 'Next');
		cy.getBySel('navbar-link-create').should('be.visible');
	});

	it('Should render the order card with the correct data', () => {
		cy.getBySel('order-card').should('have.length', 2);
		cy.getBySel('order-card').each((card) => {
			cy.orderCard(card, 'Client: Angel', 'K1 Creality', 'pending');
		});
	});

	it('Should render the create order form', () => {
		cy.getBySel('navbar-link-create').should('be.visible').click();

		cy.getBySel('order-form-close').should('be.visible');
		cy.getBySel('order-form-title').should('be.visible').and('contain.text', 'New Order');

		cy.formFieldInput('order-form-client-name', 'Client Name', "Write the client's name.");
		cy.formFieldInput('order-form-item', 'Item', 'Write the article.');
		cy.formFieldSelect('order-form-status', 'Status', 'pending');
		cy.formFieldInput('order-form-quantity', 'Quantity', 'Write the quantity.');
		cy.getBySel('order-form-button-submit')
			.should('be.visible')
			.and('contain.text', 'Create Order');
	});

	it('Should create an order successfully.', () => {
		cy.intercept('POST', '**/api/v1/order', { fixture: 'order/order-response.json' })
		cy.getBySel('navbar-link-create').should('be.visible').click();
		cy.formWriteInput('order-form-client-name', 'Jonh Doe');
		cy.formWriteInput('order-form-item', 'Bambulab A1');
		cy.formWriteInput('order-form-quantity', '2');
		cy.getBySel('order-form-button-submit').click();
		cy.wait(1000);
		cy.getBySel('toast-container').contains('Order created successfully.');
	});

	it('Should show error toast when order creation fails', () => {
		cy.intercept('POST', '**/api/v1/order', { statusCode: 500 }).as('createOrder');

		cy.getBySel('navbar-link-create').click();
		cy.formWriteInput('order-form-client-name', 'John Doe');
		cy.formWriteInput('order-form-item', 'Bambulab A1');
		cy.formWriteInput('order-form-quantity', '2');
		cy.getBySel('order-form-button-submit').click();
		cy.wait('@createOrder');
		cy.getBySel('toast-container').contains(
			'Failed to create the order. Please check the provided data.',
		);
	});

	it('Should view order details', () => {
		
		cy.intercept('GET', `**/api/v1/order/${orderId}`,{ fixture: 'order/order-view-details-response.json' })

		cy.getBySel('order-card')
			.eq(0)
			.within((card) => {
				cy.wrap(card).find('a').click();
			});
		cy.getBySel('order-detail-title').should('contain.text', 'Order Detail');
		cy.getBySel('order-detail-row-id').should('contain.text', 'Order ID');
		cy.getBySel('order-detail-row-id').should(
			'contain.text',
			orderId,
		);
		cy.getBySel('order-detail-row-customer-name').should('contain.text', 'Client Name');
		cy.getBySel('order-detail-row-customer-name').should('contain.text', 'Angel');
		cy.getBySel('order-detail-row-item').should('contain.text', 'Item');
		cy.getBySel('order-detail-row-item').should('contain.text', 'K1 Creality');
		cy.getBySel('order-detail-row-quantity').should('contain.text', 'Quantity');
		cy.getBySel('order-detail-row-quantity').should('contain.text', '12');
		cy.getBySel('order-detail-row-status').should('contain.text', 'Status');
		cy.getBySel('order-detail-row-status').should('contain.text', 'pending');
		cy.getBySel('order-detail-button-edit').should('contain.text', 'Edit Order');
		cy.getBySel('order-detail-button-delete').should('contain.text', 'Delete Order');
	});

	it('Should update an order successfully', () => {
		cy.intercept('PATCH', `**/api/v1/order/${orderId}`,{ fixture: 'order/order-update-response.json' })

		cy.getBySel('order-card-edit').eq(0).click();
		cy.orderUpdate();
	});

	it('Should show error toast when update fails', () => {
		cy.intercept({ method: 'PATCH', url: '**/api/v1/order/*' }, (req) => {
			req.reply({
				statusCode: 500,
				body: { message: 'Internal Server Error' },
			});
		}).as('updateOrder');

		cy.getBySel('order-card-edit').first().click();

		cy.getBySel('order-form-status').within(() => {
			cy.get('select').select('completed'); // distinto del valor actual
		});

		cy.getBySel('order-form-button-submit')
			.should('be.visible')
			.and('contain.text', 'Update Order')
			.click();

		cy.wait('@updateOrder').its('response.statusCode').should('eq', 500);

		cy.getBySel('toast-container').contains('Failed to update the order.');
	});

	it('Should update order in view details', () => {
		cy.intercept('GET', `**/api/v1/order/${orderId}`,{ fixture: 'order/order-view-details-response.json' })
		cy.intercept('PATCH', `**/api/v1/order/${orderId}`,{ fixture: 'order/order-update-response.json' })
		
		
		cy.getBySel('order-card')
			.eq(0)
			.within((card) => {
				cy.wrap(card).find('a').click();
			});
		cy.getBySel('order-detail-button-edit').click();
		cy.orderUpdate();
	});

	it('Should delete the order and display a success message', () => {
		cy.intercept('GET', `**/api/v1/order/${orderId}`,{ fixture: 'order/order-view-details-response.json' })

		cy.intercept('DELETE', `**/order/${orderId}`, {
			fixture: 'order/order-delete-response.json',
		});

		cy.getBySel('order-card-delete').eq(0).click();
		cy.getBySel('delete-confirmation-modal-form').should(
			'contain.text',
			`Delete order with ID ${orderId}`,
		);
		cy.getBySel('delete-confirmation-modal-form').should(
			'contain.text',
			'Are you sure you want to delete it? This action cannot be undone.',
		);
		cy.getBySel('delete-confirmation-modal-delete').click();

		cy.getBySel('toast-container').contains('Order deleted successfully.');
	});

	it('Should display an error message when deleting an order fails', () => {
		cy.intercept('GET', `**/api/v1/order/${orderId}`,{ fixture: 'order/order-view-details-response.json' })

		cy.intercept('DELETE', `**/order/${orderId}`, { statusCode: 404 });

		cy.getBySel('order-card-delete').eq(0).click();

		cy.getBySel('delete-confirmation-modal-delete').click();

		cy.getBySel('toast-container').contains('Failed to delete the order.');
	});

	it('Should display the next page with new results when clicking the Next button.', () => {
		cy.intercept('GET', '**/order?page%5Bnumber%5D=2&page%5Bsize%5D=2', {
			fixture: 'order/order-page-2-response.json',
		});
		cy.wait(2000);
		cy.getBySel('home-button-next').click();
		cy.getBySel('order-card').should('have.length', 2);
		cy.getBySel('order-card')
			.eq(0)
			.within((card) => {
				cy.orderCard(card, 'Client: Jonh Doe', 'Bambulab A1', 'completed');
			});
	});

	it('Should display the filtered results based on the status selected in the dropdown.', () => {
		cy.intercept('GET', '**/order?page%5Bnumber%5D=1&page%5Bsize%5D=2&filter%5Bstatus%5D=pending', {
			fixture: 'order/order-filter-response.json',
		}).as('order');
		
		cy.wait(2000);
		cy.getBySel('home-filter').within((field) => {
			cy.wrap(field).find('select').select('pending');
		});
		cy.wait(2000);
		cy.getBySel('order-card').should('have.length', 2);
		cy.getBySel('order-card')
			.eq(0)
			.within((card) => {
				cy.orderCard(card, 'Client: Alis', 'Bambulab A1 Mini', 'pending');
			});
	});
});
