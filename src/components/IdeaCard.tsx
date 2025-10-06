import styles from './IdeaCard.module.css'

interface IdeaCardProps {
  id: number
  title: string
  description: string
  votes: number
  votedByMe: boolean
  onVote: (ideaId: number) => void
}

function IdeaCard({ id, title, description, votes, votedByMe, onVote }: IdeaCardProps) {
  const handleVoteClick = () => {
    onVote(id)
  }

  // Ensure votes is a valid number, default to 0 if not
  const voteCount = typeof votes === 'number' && !isNaN(votes) ? votes : 0

  return (
    <div className={styles.ideaCard}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.ideaFooter}>
        <span className={styles.votes}>Votes: {voteCount}</span>
        {!votedByMe && (
          <button 
            className={styles.voteButton}
            onClick={handleVoteClick}
          >
            Vote
          </button>
        )}
      </div>
    </div>
  )
}

export default IdeaCard

