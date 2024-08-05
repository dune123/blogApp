import { Navbar, TextInput,Button, Dropdown, Avatar } from "flowbite-react"
import { Link,useLocation} from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon ,FaSun} from "react-icons/fa"
import { useSelector,useDispatch } from "react-redux"
import { signoutSuccess } from '../redux/user/userSlice';
import { toggleTheme } from "../redux/theme/themeSlice"
import axios from "axios"

const Header = () => {
  const path=useLocation().pathname
  const customActiveStyle = {
    color: '#405D72',
  };

  const { currentUser } = useSelector((state) => state.user);
  const dispatch=useDispatch()
  const {theme}=useSelector((state)=>state.theme)

  const handleLogout=async()=>{
    try {
      const res=await axios.post("http://localhost:3000/api/auth/signout",
        currentUser.userId
      )

      if(res.status===200){
        dispatch(signoutSuccess());
      }
      else{
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (  
    <Navbar className='border-b-2'>
      <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
        <span className="px-2 py-1 bg-gradient-to-r  from-purple-600 to-pink-600 rounded-lg text-white">Sameer's</span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:flex"
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch/>
      </Button>
      <div className="flex gap-2">
        <Button className="w-12 h-10 hidden sm:inline-block" color="gray" pill onClick={() => dispatch(toggleTheme())} 
        style={{backgroundColor:`${theme==='dark'?"rgb(31 41 55)":"white"}`}}
        >  
        {
            theme==='dark'?<FaSun color="grey"/>:<FaMoon color="grey"/>
        }
        </Button>
        {
            currentUser?(
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar 
                    alt='user'
                    img={currentUser.profilePicture}
                    rounded
                  />
                }
              >
                <Dropdown.Header>
                  <span className='block text-sm'>@{currentUser.username}</span>
                  <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                </Dropdown.Header>
                <Link to={'/dashboard?tab=profile'}>
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={handleLogout}>
                  Sign Out
                </Dropdown.Item>
              </Dropdown>
            ):
            (
              <Link to="/sign-in">
          <Button gradientDuoTone="purpleToPink">
            Sign In
          </Button>
        </Link>
            )
        }
      </div>
      <Navbar.Toggle/>
      <Navbar.Collapse>
          <Navbar.Link active={path==="/"} as={'div'} style={path === "/" ? customActiveStyle : null}>
            <Link to="/">
              Home
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path==="/about"} as={'div'} style={path === "/about" ? customActiveStyle : null}>
            <Link to="/about">
              About
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path==="/projects"} as={'div'} style={path === "/projects" ? customActiveStyle : null}>
            <Link to="/projects">
              Projects
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header;