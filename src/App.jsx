import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './Appwrite/Auth';
import { login, logout } from './Features/AuthSlice'
import Header from './Components/Header';
import Footer from './Components/Footer';
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
      .finally(setLoading(false));
  }, [])

  return loading ? 
      <div>Loading Please Wait in the Lobby!!!</div> :
        <div>
          <div>
            <Header />
            <main>
              TODO: {/* <Outlet/> */}
            </main>
            <Footer />
          </div>
        </div>
}

export default App