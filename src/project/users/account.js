import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams  } from "react-router-dom";



function Account() {
  const { id } = useParams();

  const [account, setAccount] = useState(null);

  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setAccount(user);
  };

  const navigate = useNavigate();

  const fetchAccount = async () => {

  const account = await client.account();
  setAccount(account);
  };

  const save = async () => {
    await client.updateUser(account);
  };

  const signout = async () => {
    await client.signout();
    navigate("/project/signin");
  };



  useEffect(() => {
    if (id) {
        findUserById(id);
      } else {
    fetchAccount();
      }
  }, []);




  return (
    <div className="container">

      <h1>Account</h1>
      <br/>
      {account && (
        <div>
        <h6>Password</h6>
          <input value={account.password}
            onChange={(e) => setAccount({ ...account,
              password: e.target.value })}/>

         <h6>First Name</h6>
          <input value={account.firstName}
            onChange={(e) => setAccount({ ...account,
              firstName: e.target.value })}/>

        <h6>Last Name</h6>
          <input value={account.lastName}
            onChange={(e) => setAccount({ ...account,
              lastName: e.target.value })}/>

        <h6>Account Number</h6>
          <input value={account.dob}
            onChange={(e) => setAccount({ ...account,
              dob: e.target.value })}/>

        <h6>Email</h6>
          <input value={account.email}
            onChange={(e) => setAccount({ ...account,
              email: e.target.value })}/>

        <h6>Account Type</h6>
          <select onChange={(e) => setAccount({ ...account,
              role: e.target.value })}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <br/>
          <br/>
          <button onClick={save} className="btn btn-primary me-4">
            Save
          </button>

          <button onClick={signout} className="btn btn-danger me-4">
            Signout
        </button>
          <Link to="/project/admin/users" className="btn btn-warning">
            Users
            </Link>
            
        </div>
      )}
    </div>
  );
}
export default Account;