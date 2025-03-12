import { useState } from 'react'
import reactLogo from '/react.svg'
import viteLogo from '/vite.svg'
import Constant from '../../Constants.js'
import './Sample.css'

async function sampleFetch() {
  const url = Constant.API_URL;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

function Sample() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Sample Webpage</h1>
      <div className="card">
        <button onClick={() => {setCount((count) => count + 1)}}>
          count is {count}
        </button>
        <button onClick={() => {sampleFetch()}}>
          Fetch! 
        </button>
        <p>
          Check console to see if fetch returns a json file!
        </p>
      </div>
    </>
  )
}

export default Sample
