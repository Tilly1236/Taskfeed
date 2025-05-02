// tests/AddPostPage.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, test, beforeEach, jest } from '@jest/globals';
import AddPostPage from '../src/pages/AddPost';     // ← adjust if your file lives elsewhere
import * as postfetch from '../src/postfetch';      // ← likewise adjust
import { useNavigate, useParams } from 'react-router-dom';

// Mock react-router hooks
jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    useNavigate: jest.fn(),
    useParams: jest.fn(),
  };
});

describe('AddPostPage component', () => {
  let mockNavigate;

  beforeEach(() => {
    // reset and stub router hooks
    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    useParams.mockReturnValue({ groupId: 'test-group' });

    // stub localStorage
    jest.spyOn(Storage.prototype, 'getItem');
    Storage.prototype.getItem.mockClear();
    jest.clearAllMocks();
  });

  test('renders textarea and Post button', () => {
    render(<AddPostPage />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /post/i })).toBeInTheDocument();
  });

  test('shows error if no token in localStorage', async () => {
    Storage.prototype.getItem.mockReturnValue(null);
    render(<AddPostPage />);
    fireEvent.click(screen.getByRole('button', { name: /post/i }));
    expect(await screen.findByText(/you must be logged in to post/i))
      .toBeInTheDocument();
  });

  
  
