import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/Login';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Login Component', () => {
  test('renders login form', () => {
    render(
      <Router>
        <Login setToken={() => {}} />
      </Router>
    );

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('submits login form', () => {
    render(
      <Router>
        <Login setToken={() => {}} />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'testpassword' } });
    fireEvent.click(screen.getByText('Login'));

    // Add more assertions based on what should happen after form submission
  });
});
