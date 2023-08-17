
import { useState } from 'react'
import './App.css'
import Footer from './Footer'
import Header from './Header'

function App() {
  const [size, setSize] = useState("");

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>{" "}
            <select id="size">
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </section>
          <section id="product">

          </section>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default App
