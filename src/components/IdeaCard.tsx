import { useState } from 'react'
import styles from './IdeaCard.module.css'

interface IdeaCardProps {
  id: number
  title: string
  description: string
  votes: number
  votedByMe: boolean
  onVote: (ideaId: number) => Promise<void>
}

function IdeaCard({ id, title, description, votes, votedByMe, onVote }: IdeaCardProps) {
  const [isVoting, setIsVoting] = useState(false)

  const handleVoteClick = async () => {
    setIsVoting(true)
    
    // Wait minimum 1 second to prevent button twitching on fast responses
    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 1000))
    await Promise.all([onVote(id), minLoadingTime])
    
    setIsVoting(false)
  }

  const voteCount = typeof votes === 'number' && !isNaN(votes) ? votes : 0

  return (
    <div className={styles.ideaCard}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.ideaFooter}>
        <span className={styles.votes}>Votes: {voteCount}</span>
        {!votedByMe && (
          <button 
            className={`${styles.voteButton} ${isVoting ? styles.voting : ''}`}
            onClick={handleVoteClick}
            disabled={isVoting}
          >
            {isVoting ? (
              <>
                <span className={styles.spinner}></span>
                Voting...
              </>
            ) : (
              'Vote'
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default IdeaCard

