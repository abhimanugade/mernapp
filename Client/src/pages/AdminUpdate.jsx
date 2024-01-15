import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";

import { toast } from "react-toastify";

const AdminUpdate = () => {
  const [data, setData] = useState({
    userName: "",
    email: "",
    phone: "",
  });
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };

  const params = useParams();
  //console.log("id",params);

  const { authorizationToken,API } = useAuth();

  useEffect(() => {
    getSingalUsersData();
  }, []);

  const getSingalUsersData = async () => {
    try {
      const response = await fetch(
        `${API}/api/admin/users/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      console.log(response);
      const responseData = await response.json();
      console.log("singal data", responseData);
      setData(responseData.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API}/api/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: authorizationToken,
            "Content-Type":"application/json",
          },
          body:JSON.stringify(data),
        }
      );

      console.log(response);
      if(response.ok){
        toast.success("Update User Successfully")
      }
      else{
        toast.error("User Not Successfully")
      }
    
  
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Update User Data</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={data.userName}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={data.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone">Phone</label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  value={data.phone}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <button type="submit">Update</button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  );
};

export default AdminUpdate;
