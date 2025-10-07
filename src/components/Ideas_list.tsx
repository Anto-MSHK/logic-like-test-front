import { useState, useEffect, useCallback } from 'react'
import IdeaCard from './IdeaCard'
import LoadingSpinner from './LoadingSpinner'
import ErrorDisplay from './ErrorDisplay'
import styles from './Ideas_list.module.css'
import { fetchIdeas, voteForIdea, type Idea } from '../services/api'
import { getSocket, connectSocket, disconnectSocket } from '../services/socket'

function IdeasList() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [voteError, setVoteError] = useState<string | null>(null)

  const loadIdeas = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await fetchIdeas()
      setIdeas(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred while loading ideas')
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadIdeas()
  }, [loadIdeas])

  useEffect(() => {
    const socket = getSocket()

    const handleVoteUpdate = (data: { ideaId: number; newVoteCount: number }) => {
      console.log('Received vote update:', data)
      
      setIdeas((currentIdeas) =>
        currentIdeas.map((idea) =>
          idea.id === data.ideaId
            ? { ...idea, votes: data.newVoteCount }
            : idea
        )
      )
    }

    connectSocket()
    socket.on('vote_update', handleVoteUpdate)

    return () => {
      socket.off('vote_update', handleVoteUpdate)
      disconnectSocket()
    }
  }, [])

  const handleVote = async (ideaId: number) => {
    setVoteError(null)

    try {
      await voteForIdea(ideaId)
      
      // Only update votedByMe - vote count comes from WebSocket to avoid double increment
      setIdeas((currentIdeas) =>
        currentIdeas.map((idea) =>
          idea.id === ideaId
            ? { ...idea, votedByMe: true }
            : idea
        )
      )
    } catch (err) {
      if (err instanceof Error) {
        setVoteError(err.message)
      } else {
        setVoteError('Failed to vote. Please try again.')
      }
      
      setTimeout(() => setVoteError(null), 5000)
    }
  }

  if (isLoading) {
    return <LoadingSpinner size="large" message="Loading ideas..." />
  }

  if (error) {
    return (
      <ErrorDisplay 
        message={error}
        onRetry={loadIdeas}
        title="Failed to Load Ideas"
      />
    )
  }

  if (ideas.length === 0) {
    return (
      <div className={styles.statusMessage}>
        <p>No ideas yet. Be the first to add one!</p>
      </div>
    )
  }
  return (
    <>
      {voteError && (
        <div className={styles.voteErrorNotification}>
          <div className={styles.errorIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round" />
              <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <p>{voteError}</p>
          <button 
            className={styles.closeButton}
            onClick={() => setVoteError(null)}
            aria-label="Close error"
          >
            ×
          </button>
        </div>
      )}
      <div className={styles.ideasList}>
        {ideas.map((idea) => (
          <IdeaCard
            key={idea.id}
            id={idea.id}
            title={idea.title}
            description={idea.description}
            votes={idea.votes}
            votedByMe={idea.votedByMe}
            onVote={handleVote}
          />
        ))}
      </div>
    </>
  )
}

export default IdeasList

