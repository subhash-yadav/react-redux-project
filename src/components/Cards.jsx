import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { Cardsdata } from "./CardsData";
import "./Style.css";
import {ADD} from "../redux/actions/action";
const Cards = () => {
  const [data, setData] = useState(Cardsdata);

  const dispatch = useDispatch();
  const send = (data) => {
    dispatch(ADD(data));
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center">Add to Cart Project</h2>
      <div className="row d-flex justify-content-center align-items-center">
        {data.map((data) => {
          return (
            <Card
              key={data.id}
              style={{ width: "22rem", border: "none" }}
              className="mt-4 mx-2 card_style"
            >
              <Card.Img
                variant="top"
                src={data.imgdata}
                style={{ height: "16rem" }}
                className="mt-3"
              />
              <Card.Body>
                <Card.Title>{data.rname}</Card.Title>
                <Card.Text>Price : रू {data.price}.00</Card.Text>
                <div className="button_div d-flex justify-content-center">
                  <Button
                    variant="primary"
                    className="col-lg-12"
                    onClick={() => send(data)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
