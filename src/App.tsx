import './App.css'
import { Images } from './components/Images'
import Header from './components/Header';

function App() {
  return (
    <div className='page'>
      <header>
        <Header />
      </header>
      <main>
        <Images />
      </main>
    </div>
  )
}

export default App
