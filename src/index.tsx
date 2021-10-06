import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import 'tachyons'
import App from './App'


ReactDOM.render(
      <Router>
        <App />
      </Router>,
  document.getElementById('root')
)
