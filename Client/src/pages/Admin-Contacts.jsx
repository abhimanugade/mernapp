import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const AdminContacts = () => {
  const { authorizationToken,API} = useAuth();
  const [contactData, setContactData] = useState([]);
  const getContactData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      console.log(response);

      const responseData = await response.json();
      console.log("responseData", responseData);

      setContactData(responseData.contacts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getContactData();
  }, []);

  const deleteContact = async (id) => {
    try {
      const response = await fetch(
        `${API}/api/admin/contacts/delete/${id}`,
        {
          method: "Delete",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      console.log(response);

      const responseData = await response.json();

      toast.success(responseData.message); 

      getContactData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="admin-contacts-section">
        <div className="container">
          <h1>Admin Contacts Data</h1>
        </div>
        <div className="container admin-users">
          {contactData &&
            contactData.map((itm, i) => {
              return (
                <div key={i}>
                  <p>{itm.userName}</p>
                  <p>{itm.email}</p>
                  <p>{itm.message}</p>
                  <button
                    className="btn"
                    onClick={() => deleteContact(itm._id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default AdminContacts;
