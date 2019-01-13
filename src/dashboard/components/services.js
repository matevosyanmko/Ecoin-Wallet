import React from "react";
import Light from "../../assets/services/light.svg";
import Water from "../../assets/services/water.svg";
import Gas from "../../assets/services/gas.svg";
import Parking from "../../assets/services/parking.svg";
import Tax from "../../assets/services/taxes.svg";
export const serviceList = [
  {
    id: 1,
    name: "Light",
    img: Light
  },
  {
    id: 2,
    name: "Water",
    img: Water
  },
  {
    id: 3,
    name: "Gas",
    img: Gas
  },
  {
    id: 4,
    name: "Parking",
    img: Parking
  },
  {
    id: 5,
    name: "Taxes",
    img: Tax
  }
];
export const Services = (
  <div className="servicesBody">
    {serviceList.map((service, key) => {
      return (
        <div className="service" key={key}>
          <img src={service.img} />
        </div>
      );
    })}
  </div>
);
