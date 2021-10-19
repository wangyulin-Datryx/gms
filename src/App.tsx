import './App.css'
import MainPage from './features/mainPage/MainPage'
import Login from './app/Login'
import axios from 'axios'
import { fetchEquipments } from './features/equipments/equipmentsSlice'
import store from './store'

const App = () => {
  if (!localStorage.getItem('loginToken')) {
    return <Login />
  }

  axios.defaults.headers.common['token'] = localStorage.getItem('loginToken') as string
  store.dispatch(fetchEquipments())

  return (
    <>
      <MainPage />
    </>
  )
}

export default App
