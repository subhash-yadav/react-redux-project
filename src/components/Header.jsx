import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { BsCartX } from "react-icons/bs";
import { Badge } from "@mui/material";
import { NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./Style.css";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { REMOVE } from "../redux/actions/action";
const Header = () => {
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const getData = useSelector((state) => state.cartReducer.carts);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const removeItem = (id) => {
    dispatch(REMOVE(id));
  };
  const totalPrice = () => {
    let price = 0;
    getData.map((data) => {
      return (price = data.price * data.qnty + price);
    });
    setPrice(price);
  };
  useEffect(() => {
    totalPrice();
  }, [totalPrice]);
  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: 60 }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-3">
            Add To Carts
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light">
              Home
            </NavLink>
          </Nav>
          <Badge
            badgeContent={getData.length}
            color="primary"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <FaShoppingCart
              style={{ color: "white", fontSize: 25, cursor: "pointer" }}
            />
          </Badge>
          <Menu
            style={{ marginTop: "22px" }}
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {getData.length ? (
              <div
                className="card_details"
                style={{ width: "24rem", padding: "10px" }}
              >
                <Table>
                  <thead>
                    <tr>
                      <th>Photos</th>
                      <th>Restaurant Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getData.map((cartData) => {
                      return (
                        <>
                          <tr>
                            <td>
                              <NavLink
                                to={`/cart/${cartData.id}`}
                                onClick={handleClose}
                              >
                                <img
                                  src={cartData.imgdata}
                                  alt=""
                                  style={{
                                    width: "5rem",
                                    height: "5rem",
                                    cursor: "pointer",
                                  }}
                                />
                              </NavLink>
                            </td>
                            <td>
                              <p>{cartData.rname}</p>
                              <p>Price: रू {cartData.price}</p>
                              <p>Quantity: {cartData.qnty}</p>
                              <p
                                style={{
                                  display: "inline-block",
                                  color: "red",
                                  fontSize: "20px",
                                  cursor: "pointer",
                                }}
                              >
                                <FaTrashAlt
                                  className="smalltrash"
                                  onClick={() => removeItem(cartData.id)}
                                />
                              </p>
                            </td>
                            <td>
                              <p
                                style={{
                                  display: "inline-block",
                                  color: "red",
                                  fontSize: "20px",
                                  cursor: "pointer",
                                }}
                              >
                                <FaTrashAlt
                                  className="largetrash"
                                  onClick={() => removeItem(cartData.id)}
                                />
                              </p>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                    <p className="">
                      <strong>Total:</strong>रू {price}
                    </p>
                  </tbody>
                </Table>
              </div>
            ) : (
              <div
                className="card_details"
                style={{
                  position: "relative",
                  width: "24rem",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <RxCrossCircled
                  onClick={handleClose}
                  style={{
                    fontSize: 25,
                    cursor: "pointer",
                    position: "absolute",
                    right: 20,
                    top: 2,
                    color: "lightcoral",
                  }}
                />
                <p style={{ fontSize: 22 }}>Your Cart is Empty</p>
                <BsCartX
                  style={{
                    fontSize: 40,
                    marginLeft: "10px",
                    color: "lightcoral",
                  }}
                />
              </div>
            )}
          </Menu>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
