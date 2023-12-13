import { Route, Routes, Link } from "react-router-dom"; 
import Home from "./home";
import Login from "./login";
import Profile from "./profile";
import Signup from "./signup";
import Search from "./search";
import Details from "./details";
import { useState } from "react";
import Signin from "./users/signin";
import UserList from "./users/list";
import Account from "./users/account";
import UserTable from "./users/table";



function Project() {
    const [key, setKey] = useState("home");

    return (
        <div>
            <div className="container-fluid">
            <h1> Project </h1>
            <div className="row"> 
                <div className="col-1">
                    <div className="list-group">
                        <Link to="/project/home" className="list-group-item">Home</Link>
                        <Link to="/project/login" className="list-group-item">Login</Link>
                        <Link to="/project/signup" className="list-group-item">Signup</Link>
                        <Link to="/project/profile" className="list-group-item">Profile</Link>
                        <Link to="/project/search" className="list-group-item">Search</Link>
                        <Link to="/project/details" className="list-group-item">Details</Link>
                        <Link to="/project/signin" className="list-group-item">Signin</Link>
                        <Link to="/project/users" className="list-group-item">Users</Link>
                        <Link to="/project/account" className="list-group-item">Account</Link>
                        
                    </div>
                </div>
                <div className="col-10">
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/details" element={<Details />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/users" element={<UserList />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/admin/users" element={<UserTable />} />
                    </Routes>
                </div>
            </div>
            </div>
            {/* Remove or comment out in production */}
            <pre>{JSON.stringify(process.env, null, 2)}</pre>
        </div>
    );
}

export default Project;
