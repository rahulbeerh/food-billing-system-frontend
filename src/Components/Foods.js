import { useGetFoodQuery } from "../Slices/foodApiSlice";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Form,
} from "react-bootstrap";
import { addToCart } from "../Slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import classes from "./Foods.module.css";
import Loader from "./Loader";

const Foods = () => {
  const [quantity, setQuantity] = useState(1);
  const { data: food, isLoading } = useGetFoodQuery();
  const { filteredItems } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const addToCartHandler = (foodItem) => {
    dispatch(addToCart({ ...foodItem, quantity: Number(quantity) }));
    toast.success(`${foodItem.name} added to billing list`);
  };
  return (
    <Container fluid>
      <Row>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {filteredItems.length === 0
              ? food.map((foodItem) => {
                  return (
                    <Col
                      lg={3}
                      md={6}
                      sm={6}
                      xs={6}
                      key={foodItem._id}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Card className={classes.card}>
                        <Card.Img variant="top" src={foodItem.image} />
                        <Card.Body>
                          <Card.Title className={classes.title}>
                            {foodItem.name}
                          </Card.Title>
                          <Card.Text>{foodItem.description}</Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                          <ListGroup.Item>
                            <strong>Price: Rs. {foodItem.price}</strong>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Form.Select
                              aria-label="Quantity"
                              onChange={(e) => setQuantity(e.target.value)}
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
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Button
                              variant="info"
                              size="sm"
                              onClick={() => addToCartHandler(foodItem)}
                            >
                              Order
                            </Button>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card>
                    </Col>
                  );
                })
              : filteredItems.map((foodItem) => {
                  return (
                    <Col
                      lg={3}
                      md={6}
                      sm={6}
                      xs={6}
                      key={foodItem._id}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Card className={classes.card}>
                        <Card.Img variant="top" src={foodItem.image} />
                        <Card.Body>
                          <Card.Title className={classes.title}>
                            {foodItem.name}
                          </Card.Title>
                          <Card.Text>{foodItem.description}</Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                          <ListGroup.Item>
                            <strong>Price: Rs. {foodItem.price}</strong>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Form.Select
                              aria-label="Quantity"
                              onChange={(e) => setQuantity(e.target.value)}
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
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Button
                              variant="info"
                              size="sm"
                              onClick={() => addToCartHandler(foodItem)}
                            >
                              Order
                            </Button>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card>
                    </Col>
                  );
                })}
          </>
        )}
      </Row>
    </Container>
  );
};

export default Foods;
