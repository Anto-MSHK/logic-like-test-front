// API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export interface Idea {
  id: number
  title: string
  description: string
  votes: number
  votedByMe: boolean
}

/**
 * Fetches the list of ideas from the backend
 * @returns Promise with array of ideas
 */
export async function fetchIdeas(): Promise<Idea[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/ideas`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch ideas: ${error.message}`)
    }
    throw new Error('Failed to fetch ideas: Unknown error')
  }
}

