import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { REMOVE, ADD, REMOVEINDIVIDUAL } from "../redux/actions/action";

const CardsDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const getData = useSelector((state) => state.cartReducer.carts);

  const compare = () => {
    let comparedata = getData.filter((data) => {
      return data.id == id;
    });
    setData(comparedata);
  };
  useEffect(() => {
    compare();
  }, [id]);
  const removeItem = (id) => {
    dispatch(REMOVE(id));
    navigate("/");
  };
  const send = (data) => {
    dispatch(ADD(data));
  };
  const remove = (item) =>{
    dispatch(REMOVEINDIVIDUAL(item))
  }
  return (
    <>
      <div className="container mt-3">
        <h2 className="text-center">Items Detail Page</h2>
        <section className="container mt-3">
          <div className="iteamsdetails">
            {data.map((data) => {
              return (
                <>
                  <div className="items_img">
                    <img src={data.imgdata} alt="" />
                  </div>
                  <div className="details">
                    <Table>
                      <tr>
                        <td>
                          <p>
                            <strong>Restaurant</strong> : {data.rname}
                          </p>
                          <p>
                            <strong>Price</strong> : रू {data.price}
                          </p>
                          <p>
                            <strong>Dishes</strong> : {data.address}
                          </p>
                          <p>
                            <strong>Total</strong> : रू{data.price * data.qnty}
                          </p>
                          <div
                            className="mt-5 d-flex justify-content-between align-items-center"
                            style={{
                              width: "100px",
                              cursor: "pointer",
                              background: "#ddd",
                              color: "#111",
                            }}
                          >
                            {" "}
                            <span style={{ fontSize: 24 }} onClick={data.qnty <= 1 ? ()=>removeItem(data.id) : ()=>remove(data)}>-</span>
                            <span style={{ fontSize: 22 }}>{data.qnty}</span>
                            <span style={{ fontSize: 24 }} onClick={()=>send(data)}>+</span>
                          </div>
                        </td>
                        <td>
                          <p>
                            <strong>Rating : </strong>
                            <span
                              style={{
                                background: "green",
                                color: "#fff",
                                padding: "2px 5px",
                                borderRadius: "5px",
                              }}
                            >
                              {data.rating} ★
                            </span>
                          </p>
                          <p>
                            <strong>Order Review : </strong>
                            <span>{data.somedata}</span>
                          </p>
                          <p>
                            <strong>Remove : </strong>
                            <span>
                              <FaTrashAlt
                                onClick={() => removeItem(data.id)}
                                style={{
                                  fontSize: 20,
                                  marginLeft: "5px",
                                  color: "red",
                                  cursor: "pointer",
                                }}
                              />
                            </span>
                          </p>
                        </td>
                      </tr>
                    </Table>
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default CardsDetail;
