import { render } from '@testing-library/react';
import Fallback from '../../components/Fallback';
import NotFoundError from '../../common/errors/NotFoundError';
import BadRequestError from '../../common/errors/BadRequestError';
import ForbiddenError from '../../common/errors/ForbiddenError';
import CustomError from '../../common/errors/CustomError';

describe('Fallback component', () => {
  it('renders "Resource not found" for NotFoundError', () => {
    const error = new NotFoundError('Not found');
    const { getByText } = render(<Fallback error={error} />);
    expect(getByText('Resource not found')).toBeInTheDocument();
  });

  it('renders "Re-check passed data" for BadRequestError', () => {
    const error = new BadRequestError('Bad request');
    const { getByText } = render(<Fallback error={error} />);
    expect(getByText('Re-check passed data')).toBeInTheDocument();
  });

  it('renders "This resource is not available to you" for ForbiddenError', () => {
    const error = new ForbiddenError('Forbidden');
    const { getByText } = render(<Fallback error={error} />);
    expect(
      getByText('This resource is not available to you')
    ).toBeInTheDocument();
  });

  it('renders custom message for CustomError', () => {
    const error = new CustomError('Custom error message');
    const { getByText } = render(<Fallback error={error} />);
    expect(getByText('Custom error message')).toBeInTheDocument();
  });

  it('renders "Something went wrong." for generic errors', () => {
    const error = new Error('Generic error');
    const { getByText } = render(<Fallback error={error} />);
    expect(getByText('Something went wrong.')).toBeInTheDocument();
  });
});
