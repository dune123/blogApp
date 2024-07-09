import { Navbar, TextInput,Button } from "flowbite-react"
import { Link,useLocation} from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon } from "react-icons/fa"

const Header = () => {
  const path=useLocation().pathname
  const customActiveStyle = {
    color: '#405D72',
  };
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
        <Button className="w-12 h-10 hidden sm:inline-block" color="gray" pill >
          <FaMoon color="gray"/>
        </Button>
        <Link to="/sign-in">
          <Button gradientDuoTone="purpleToPink">
            Sign In
          </Button>
        </Link>
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