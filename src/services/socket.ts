import { io, Socket } from 'socket.io-client'

// Get socket URL from environment or use default
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000'

// Create a single socket instance
let socket: Socket | null = null

/**
 * Gets or creates the socket instance
 * Ensures only one connection is maintained
 */
export function getSocket(): Socket {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false, // Manual connection control
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    // Log connection events for debugging
    socket.on('connect', () => {
      console.log('Socket connected:', socket?.id)
    })

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason)
    })

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error)
    })
  }

  return socket
}

/**
 * Connects the socket if not already connected
 */
export function connectSocket(): void {
  const socket = getSocket()
  if (!socket.connected) {
    socket.connect()
  }
}

/**
 * Disconnects the socket
 */
export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect()
  }
}

/**
 * Check if socket is connected
 */
export function isSocketConnected(): boolean {
  return socket?.connected ?? false
}

