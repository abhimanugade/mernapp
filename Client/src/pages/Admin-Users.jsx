import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { authorizationToken,API } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      console.log(response);
      const responseData = await response.json();
      console.log("responseData", responseData);

      setUsers(responseData.users);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsersData();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `${API}/api/admin/users/delete/${id}`,
        {
          method: "Delete",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      console.log(response);
      const responseData = await response.json();
      console.log("after delete", responseData);
      getAllUsersData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin Users Data</h1>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((itm, i) => {
                  return (
                    <tr key={i}>
                      <td>{itm.userName}</td>
                      <td>{itm.email}</td>
                      <td>{itm.phone}</td>
                      <td><Link to={`/admin/users/${itm._id}/edit`}>Edit</Link></td>
                      <td>
                        <button onClick={() => deleteUser(itm._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AdminUsers;
