import { useState, useEffect } from 'react'
import { getSocket } from '../services/socket'
import styles from './ConnectionStatus.module.css'

function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    const socket = getSocket()

    const handleConnect = () => {
      setIsConnected(true)
    }

    const handleDisconnect = () => {
      setIsConnected(false)
    }

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)

    setIsConnected(socket.connected)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
    }
  }, [])

  if (isConnected) {
    return null
  }

  return (
    <div className={`${styles.container} ${styles.disconnected}`}>
      <div className={styles.indicator}></div>
      <span className={styles.text}>
        Disconnected - Trying to reconnect...
      </span>
    </div>
  )
}

export default ConnectionStatus

