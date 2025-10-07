import styles from './ErrorDisplay.module.css'

interface ErrorDisplayProps {
  message: string
  onRetry?: () => void
  title?: string
}

function ErrorDisplay({ message, onRetry, title = 'Error' }: ErrorDisplayProps) {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.retryButton} onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorDisplay

