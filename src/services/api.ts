const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export interface Idea {
  id: number
  title: string
  description: string
  votes: number
  votedByMe: boolean
}

// Maps API response (votesCount) to internal interface (votes)
function normalizeIdea(idea: any): Idea {
  return {
    id: idea.id,
    title: idea.title || '',
    description: idea.description || '',
    votes: typeof idea.votesCount === 'number' ? idea.votesCount : 0,
    votedByMe: Boolean(idea.votedByMe),
  }
}

export async function fetchIdeas(): Promise<Idea[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/ideas`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return Array.isArray(data) ? data.map(normalizeIdea) : []
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch ideas: ${error.message}`)
    }
    throw new Error('Failed to fetch ideas: Unknown error')
  }
}

export async function voteForIdea(ideaId: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/ideas/${ideaId}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      // Parse error message from response body (supports {error: "..."} and {message: "..."})
      let errorMessage = ''
      
      try {
        const errorData = await response.json()
        errorMessage = errorData.error || errorData.message || ''
      } catch (parseError) {
        // Ignore parsing errors, use fallback
      }
      
      if (errorMessage) {
        throw new Error(errorMessage)
      } else if (response.status === 409) {
        throw new Error('You have already voted for this idea or reached the voting limit')
      } else {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to vote: Unknown error')
  }
}

