import IdeasList from './components/Ideas_list'
import ConnectionStatus from './components/ConnectionStatus'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <ConnectionStatus />
      <h1>Voting System</h1>
      <IdeasList />
    </div>
  )
}

export default App

