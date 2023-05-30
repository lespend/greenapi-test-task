import { CssBaseline } from "@mui/material"
import LoginPage from "./pages/LoginPage/LoginPage"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import ChatPage from "./pages/ChatPage/ChatPage"

function App() {
  const [auth, setAuth] = useContext(AuthContext)

  return (
    <>
    <CssBaseline/>
    {Object.keys(auth).length > 0 ? <ChatPage/> : <LoginPage/>}
    </>
  )
}

export default App
