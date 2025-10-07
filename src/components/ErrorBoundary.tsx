import { Component, ReactNode, ErrorInfo } from 'react'
import ErrorDisplay from './ErrorDisplay'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorDisplay
          title="Something Went Wrong"
          message={
            this.state.error?.message ||
            'An unexpected error occurred. Please try refreshing the page.'
          }
          onRetry={this.handleReset}
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

