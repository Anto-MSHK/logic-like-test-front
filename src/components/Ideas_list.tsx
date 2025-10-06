import IdeaCard from './IdeaCard'
import styles from './Ideas_list.module.css'

// Static data for Stage 1
const staticIdeas = [
  {
    id: 1,
    title: "Add Dark Mode",
    description: "...",
    votes: 15
  },
  {
    id: 2,
    title: "Mobile App Version",
    description: "...",
    votes: 23
  },
  {
    id: 3,
    title: "Email Notifications",
    description: "...",
    votes: 8
  }
]

function IdeasList() {
  return (
    <div className={styles.ideasList}>
      {staticIdeas.map((idea) => (
        <IdeaCard
          key={idea.id}
          id={idea.id}
          title={idea.title}
          description={idea.description}
          votes={idea.votes}
        />
      ))}
    </div>
  )
}

export default IdeasList

