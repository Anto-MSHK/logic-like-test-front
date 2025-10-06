import { useState, useEffect } from 'react'
import IdeaCard from './IdeaCard'
import styles from './Ideas_list.module.css'
import { fetchIdeas, type Idea } from '../services/api'

function IdeasList() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadIdeas = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchIdeas()
        setIdeas(data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadIdeas()
  }, [])

  // Loading state
  if (isLoading) {
    return (
      <div className={styles.statusMessage}>
        <p>Loading...</p>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className={styles.statusMessage}>
        <p className={styles.errorMessage}>Error: {error}</p>
      </div>
    )
  }

  // Empty state
  if (ideas.length === 0) {
    return (
      <div className={styles.statusMessage}>
        <p>No ideas yet. Be the first to add one!</p>
      </div>
    )
  }

  // Success state - render ideas
  return (
    <div className={styles.ideasList}>
      {ideas.map((idea) => (
        <IdeaCard
          key={idea.id}
          id={idea.id}
          title={idea.title}
          description={idea.description}
          votes={idea.votes}
          votedByMe={idea.votedByMe}
        />
      ))}
    </div>
  )
}

export default IdeasList

