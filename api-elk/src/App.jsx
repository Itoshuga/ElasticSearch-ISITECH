import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import TableComponent from './components/TableComponent'
import VehicleForm from './components/VehicleForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Tableau des Données</h1>
      <div>
        <VehicleForm/>
        <TableComponent/>
      </div>
    </>
  )
}

export default App
