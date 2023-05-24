import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import TableComponent from './components/TableComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <TableComponent/>
      </div>
    </>
  )
}

export default App
