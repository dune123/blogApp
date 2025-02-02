import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from "./pages/SignUp"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import Projects from './pages/Projects'
import Header from "./components/Header"
import FooterComp from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import PostPage from './pages/PostPage'
import UpdatePost from './pages/UpdatePost'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="about" element={<About/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='sign-up' element={<SignUp/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}>
          <Route path="/create-post" element={<CreatePost/>}/>
          <Route path="/update-post/:postId" element={<UpdatePost/>}/>
        </Route>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/post/:postSlug" element={<PostPage/>}/>
        <Route path='/post/:postSlug' element={<PostPage/>} />
      </Routes>
      <FooterComp/>
    </BrowserRouter>
  )
}

export default App
