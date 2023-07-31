import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Table,
  Image,
  Form,
  Badge
} from "react-bootstrap";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../Slices/cartSlice";
import { FaTrash } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { clearCart } from "../Slices/cartSlice";

const BillModal = () => {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  const { cartItems, cartTotal ,cartCount} = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (cartItem) => {
    if (
      window.confirm(`Are you sure you want to remove the '${cartItem.name}'`)
    ) {
      dispatch(removeFromCart(cartItem));
    }
  };

  const clearCartHandler=()=>{
    if(window.confirm("Are you sure you want to clear the order billing table?")){
      dispatch(clearCart());
    }
  }

  const printRef = useRef();
  const printHandler = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="d-grid gap-2">
          <Button
            className="me-2 mb-4"
            variant="info"
            size="sm"
            onClick={() => handleShow("xxl-down")}
          >
            Show Bill {cartCount>0 && <Badge bg="dark">{cartCount}</Badge>}
          </Button>
          </div>
          <Modal
            show={show}
            fullscreen={fullscreen}
            onHide={() => setShow(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Bill</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container fluid>
                <Row>
                  <Col ref={printRef} md={12}>
                    {cartItems.length===0 && <h2>No food items order</h2>}
                    {cartItems.length > 0 && (
                      <Table responsive striped bordered hover variant="dark">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>IMAGE</th>
                            <th>NAME</th>
                            <th>DESCRIPTION</th>
                            <th>PRICE</th>
                            <th>QUANTITY</th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((cartItem, idx) => {
                            return (
                              <tr key={cartItem._id}>
                                <td>{idx + 1}</td>
                                <td>
                                  <Image
                                    src={cartItem.image}
                                    width="40%"
                                    height="30px"
                                    rounded
                                    alt={cartItem.name}
                                  />
                                </td>
                                <td>{cartItem.name}</td>
                                <td>{cartItem.description}</td>
                                <td>{cartItem.price}</td>
                                <td>{cartItem.quantity}</td>
                                <td>
                                  <Form.Select
                                    aria-label="Quantity"
                                    value={cartItem.quantity}
                                    onChange={(e) =>
                                      dispatch(
                                        addToCart({
                                          ...cartItem,
                                          quantity: Number(e.target.value),
                                        })
                                      )
                                    }
                                  >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                  </Form.Select>
                                </td>
                                <td>
                                  <FaTrash
                                    style={{
                                      cursor: "pointer",
                                      color: "#FE0000",
                                    }}
                                    onClick={() =>
                                      removeFromCartHandler(cartItem)
                                    }
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    )}
                    {cartItems.length > 0 && (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <h2>Total Bill: Rs. {cartTotal}</h2>
                      </div>
                    )}
                  </Col>
                  {cartItems.length > 0 && (
                    <Col md={12}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button variant="info" onClick={printHandler}>
                          Print Bill
                        </Button>
                        <Button variant="outline-info" className="mx-2" onClick={clearCartHandler}>
                          Clear Cart
                        </Button>
                      </div>
                    </Col>
                  )}
                </Row>
              </Container>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default BillModal;
