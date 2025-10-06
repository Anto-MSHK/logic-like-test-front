import IdeasList from './components/Ideas_list'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <h1>Voting System</h1>
      <IdeasList />
    </div>
  )
}

export default App

