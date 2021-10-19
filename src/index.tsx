import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import 'tachyons'
import App from './App'
import "./axiosInterceptors"
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
  document.getElementById('root')
)
