import React from 'react'
import { Container, Logo, LogoutBtn } from './Imports'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.Status)
const navigate = useNavigate()
const navItems = [
  {
    name: "Home",
    Slug: '/',
    Status: true,
  },
  {
    name: "Login",
    Slug: '/login',
    Status: !authStatus,
  },
  {
    name: "Signup",
    Slug: '/signup',
    Status: !authStatus,
  },
  {
    name: "All Posts",
    Slug: '/posts',
    Status: authStatus,
  },
  {
    name: "Add Post",
    Slug: '/add-post',
    Status: authStatus,
  },
]
  return (
    <div>
      <header className=' py-3 shadow bg-gray-500'>
        <Container>
          <nav className='flex'>
            <div className='mr-4'>
              <Link to='/'>
                <Logo width='70px' />

              </Link>
            </div>
            <ul className='flex ml-auto'>
              {navItems.map((item) =>
                item.Status ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.Slug)}
                      className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                    >{item.name}</button>
                    {/* {console.log(item.Slug)} */}
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />     
                </li>
              )}
            </ul>
          </nav>
        </Container>
      </header>
    </div>
  )
}

export default Header
