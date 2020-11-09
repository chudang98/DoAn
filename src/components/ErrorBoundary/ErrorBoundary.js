import React from 'react';
import Exception from '@/components/Exception';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    //   logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      //   this.props.onError();
      // You can render any custom fallback UI
      return (
        <Exception
          type="500"
          desc={formatMessage({ id: 'app.exception.description.500' })}
          linkElement={Link}
          backText={formatMessage({ id: 'app.exception.back' })}
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
