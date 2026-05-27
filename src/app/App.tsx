import fichaje from '../assets/images/fichaje.jpg'
import '../shared/styles/index.css'

function App() {

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={fichaje} className="base" width="170" height="179" alt="" />
        </div>
        <div>
          <h1>Fichaje</h1>
        </div>
        <button
          type="button"
          className="counter"
        >
          Fichaje
        </button>
      </section>
    </>
  )
}

export default App
