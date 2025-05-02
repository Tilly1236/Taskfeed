// tests/AddPostPage.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, beforeEach, jest } from '@jest/globals';
import AddPostPage from '../client/src/pages/AddPost';      // adjust path as needed
import * as postfetch from '../client/src/postfetch';      // adjust path as needed
import { useNavigate } from 'react-router-dom';

// Mock react-router’s useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('AddPostPage component', () => {
  let mockNavigate;

  beforeEach(() => {
    // reset mocks before each test
    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    Storage.prototype.getItem = jest.fn();
    jest.clearAllMocks();
  });

  test('renders a textarea and a Post button', () => {
    render(<AddPostPage />);
    // should find the message textbox
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    // should find the submit button
    expect(screen.getByRole('button', { name: /post/i })).toBeInTheDocument();
  });

  test('shows an error if no token is in localStorage', async () => {
    // simulate not logged in
    Storage.prototype.getItem.mockReturnValue(null);
    render(<AddPostPage />);
    fireEvent.click(screen.getByRole('button', { name: /post/i }));
    // the error alert should appear
    expect(
      await screen.findByText(/you must be logged in to post/i)
    ).toBeInTheDocument();
  });

  test('on successful post, shows success message then navigates to /feed', async () => {
    // simulate logged in and a successful API call
    Storage.prototype.getItem.mockReturnValue('fake-token');
    jest.spyOn(postfetch, 'postToFeed').mockResolvedValue({});
    
    render(<AddPostPage />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hello!' } });
    fireEvent.click(screen.getByRole('button', { name: /post/i }));

    // success alert should appear
    expect(await screen.findByText(/post submitted!/i)).toBeInTheDocument();

    // wait out the 3s delay before redirect
    await new Promise((res) => setTimeout(res, 3100));
    // verify navigate was called correctly
    expect(mockNavigate).toHaveBeenCalledWith('/feed', { state: { refresh: true } });
  });
});
