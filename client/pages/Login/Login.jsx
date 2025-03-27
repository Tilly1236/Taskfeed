import reactLogo from '/react.svg'
import viteLogo from '/vite.svg'
import Constant from '../../Constants.js'
import './Login.css'




  function Login(){
    const textBox = document.createElement("input");


    return(
        <>
            <div className = 'Logo'>
                <h2> Taskfeed </h2>
            </div>
            
            <div className = 'words'>
              <h1>Sign In</h1>
              <h3>or create an account</h3>
          </div>
          <button id='signIn'>
              Sign in
          </button>

          </>
        )

  }
  export default Login
