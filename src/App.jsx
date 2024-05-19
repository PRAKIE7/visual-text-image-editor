import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './Appwrite/Auth';
import { login, logout } from './Features/AuthSlice'
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Outlet } from 'react-router-dom';
// import Store from './Store/Store';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService.checkCurrAccount()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout)
        }
      })
      .finally(() => setLoading(false));
  }, [loading, setLoading])

  return  !loading ?
    (<div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          TODO: <Outlet />
        </main>
        <Footer />
      </div>
    </div>) : <div>Loading Please Wait!!!</div>

}

export default App