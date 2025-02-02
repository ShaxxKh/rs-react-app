import React from 'react';
import NotFoundError from '../common/errors/NotFoundError';
import BadRequestError from '../common/errors/BadRequestError';
import ForbiddenError from '../common/errors/ForbiddenError';
import CustomError from '../common/errors/CustomError';

type FallbackProps = {
  error: Error;
};

class Fallback extends React.Component<FallbackProps> {
  render() {
    const { error } = this.props;

    console.log(`${error.name}: ${error.message}, ${error.stack}`);

    if (error instanceof NotFoundError) {
      return <h1>Resource not found</h1>;
    } else if (error instanceof BadRequestError) {
      return <h1>Re-check passed data</h1>;
    } else if (error instanceof ForbiddenError) {
      return <h1>This resource is not available to you</h1>;
    } else if (error instanceof CustomError) {
      return <h1>{error.message}</h1>;
    }

    return <h1>Something went wrong.</h1>;
  }
}

export default Fallback;
