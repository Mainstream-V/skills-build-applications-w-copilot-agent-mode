import './App.css'
import { Routes, Route, Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
      <p className="lead">A modern multi-tier fitness tracking experience.</p>
      <Link to="/" className="btn btn-primary">View Dashboard</Link>
    </div>
  )
}

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">OctoFit</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
