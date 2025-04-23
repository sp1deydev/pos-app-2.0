
import { BrowserRouter } from 'react-router-dom'
import Router from "./routes/Router";
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Router />
      </BrowserRouter>
    </>
  )
}

export default App
