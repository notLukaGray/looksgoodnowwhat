import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NavMenu from '../NavMenu';

// Mock the chapters data
jest.mock('../../lib/chapters', () => ({
  getNavItems: () => [
    {
      part: 'Part I',
      chapters: [
        { slug: 'introduction', title: 'Introduction', order: 1 },
        { slug: 'chapterone', title: 'Chapter One', order: 2 },
      ],
    },
  ],
}));

describe('NavMenu', () => {
  it('renders navigation menu', () => {
    render(<NavMenu navItems={[]} />);

    // Check if the menu is rendered
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('shows search functionality', () => {
    render(<NavMenu navItems={[]} />);

    // Check if search button is present
    const searchButton = screen.getByLabelText(/search/i);
    expect(searchButton).toBeInTheDocument();
  });

  it('opens search modal when search button is clicked', async () => {
    render(<NavMenu navItems={[]} />);

    const searchButton = screen.getByLabelText(/search/i);
    fireEvent.click(searchButton);

    // Wait for search modal to appear
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText(/search chapters/i)
      ).toBeInTheDocument();
    });
  });

  it('displays navigation items when provided', () => {
    const navItems = [
      {
        part: 'Part I',
        chapters: [
          { slug: 'introduction', title: 'Introduction', order: 1 },
          { slug: 'chapterone', title: 'Chapter One', order: 2 },
        ],
      },
    ];

    render(<NavMenu navItems={navItems} />);

    // Check if part title is displayed
    expect(screen.getByText('Part I')).toBeInTheDocument();

    // Check if chapter links are displayed
    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText('Chapter One')).toBeInTheDocument();
  });
});
