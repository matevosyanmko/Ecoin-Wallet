import ServicePaymentView from "../servicePaymentView/ServicePaymentView";
import { Button } from "semantic-ui-react";
import React from "react";
import Light from "../../assets/services/light.svg";
import Water from "../../assets/services/water.svg";
import Gas from "../../assets/services/gas.svg";
import Parking from "../../assets/services/parking.svg";
import Tax from "../../assets/services/taxes.svg";
export const serviceList = [
  {
    id: 0,
    name: "Լույս",
    img: Light
  },
  {
    id: 1,
    name: "Ջուր",
    img: Water
  },
  {
    id: 2,
    name: "Գազ",
    img: Gas
  },
  {
    id: 3,
    name: "Ավտոկայանատեղի",
    img: Parking
  },
  {
    id: 4,
    name: "Հարկեր",
    img: Tax
  }
];
export default class Services extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 1,
      serviceId: null
    };
  }

  render() {
    const { view, serviceId } = this.state;
    const { firebase, uid, balance } = this.props;
    let viewToRend;
    switch (view) {
      case 1:
        viewToRend = (
          <>
            {serviceList.map((service, key) => {
              return (
                <div
                  className="service"
                  key={key}
                  onClick={() => {
                    this.setState({ serviceId: key, view: 2 });
                  }}
                >
                  <img src={service.img} />
                </div>
              );
            })}
          </>
        );
        break;
      case 2:
        viewToRend = (
          <>
            {serviceId !== null && (
              <ServicePaymentView
                initialView={() => {
                  this.setState({ view: 1 });
                }}
                serviceObject={serviceList[serviceId]}
                uid={uid}
                firebase={firebase}
                balance={balance}
                img={serviceList[serviceId].img}
                succes={() => this.setState({ view: 3 })}
              />
            )}
          </>
        );
        break;
      case 3:
        viewToRend = (
          <div className="overlayAlert">
            <h2>Վճարումը կատարված է</h2>
            <Button
              secondary
              size="medium"
              onClick={() => this.setState({ view: 1 })}
            >
              Փակել
            </Button>
          </div>
        );
        // code block
        break;
      default:
      // code block
    }
    return <div className="servicesBody rel">{viewToRend}</div>;
  }
}
