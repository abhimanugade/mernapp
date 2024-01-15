import React from "react";
import { useAuth } from "../store/auth";

const Service = () => {
  const { services } = useAuth();
  console.log(services);
  return (
    <>
      <section className="section-services">
        <div className="container">
          <h1 className="main-heading">Services</h1>
        </div>
        <div className="container grid grid-three-cols">
          {services &&services.map((itm, i) => {
            return (
              <div className="card" key={i}>
                <div className="card img">
                  <img
                    src="/images/design.png"
                    alt="our services"
                    width="200"
                  />
                </div>
                <div className="card-details">
                  <div className=" grid grid-two-cols">
                    <p>{itm.provider}</p>
                    <p>{itm.price}</p>
                  </div>
                  <h2>{itm.service}</h2>
                  <p>{itm.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Service;
