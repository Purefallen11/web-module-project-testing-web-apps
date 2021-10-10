import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
	render(<ContactForm />)
	
	const header = screen.getByText(/contact form/i)

	expect(header).toBeInTheDocument()
	expect(header).toHaveTextContent(/contact form/i)
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {

	render(<ContactForm />)
	
	const firstName = screen.getByLabelText(/first name/i)

	userEvent.type(firstName, 'stev')

	await waitFor(() => {
		const errorMess = screen.queryByText(/must have at least 5 characters/i)

		expect(errorMess).toBeInTheDocument()
	})

});

test('renders THREE error messages if user enters no values into any fields.', async () => {

	render(<ContactForm />)

	const firstName = screen.getByLabelText(/first name/i)
	const lastName = screen.getByLabelText(/last name/i)
	const email = screen.getByLabelText(/email/i)
	
	expect(firstName).toBeEmpty()
	expect(lastName).toBeEmpty()
	expect(email).toBeEmpty()

	const clickSubmit = screen.getByRole('button')
	userEvent.click(clickSubmit)

	await waitFor(() => {
		
		const fnError = screen.getByText(/must have at least 5 characters/i)
		const lnError = screen.getByText(/is a required field/i)
		const emailError = screen.getByText(/must be a valid email address/i)

		expect(fnError).toBeInTheDocument()
		expect(lnError).toBeInTheDocument()
		expect(emailError).toBeInTheDocument()
	})
});

// test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    
// });

// test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
// });

// test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
// });

// test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
// });

// test('renders all fields text when all fields are submitted.', async () => {
    
// });