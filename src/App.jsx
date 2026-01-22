import register from "./pages/register";
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Register from "./pages/register"
import Login from "./pages/login";
import Home from "./pages/home";
import CreateMeeting from "./pages/create-meeting";
import UpdateMeeting from "./pages/update";
import ManagerRespond from "./pages/manager-respond";
import EmployeRespond from "./pages/employe-respond";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path = '/register' element = {<Register />} />
    <Route path = '/login' element = {<Login />} />
    <Route path = '/' element = {<Home />} />
    <Route path = '/create-meetings' element = {<CreateMeeting />} />
    <Route path = '/meetings/manager-respond' element = {<ManagerRespond />} />
    <Route path = '/meetings/employee-respond/:id' element = {<EmployeRespond />} />
    <Route path = '/meetings/update/:id' element = {<UpdateMeeting />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App
