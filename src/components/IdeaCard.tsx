import styles from './IdeaCard.module.css'

interface IdeaCardProps {
  id: number
  title: string
  description: string
  votes: number
}

function IdeaCard({ title, description, votes }: IdeaCardProps) {
  return (
    <div className={styles.ideaCard}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.ideaFooter}>
        <span className={styles.votes}>Votes: {votes}</span>
        <button className={styles.voteButton}>Vote</button>
      </div>
    </div>
  )
}

export default IdeaCard

