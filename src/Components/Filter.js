import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { filterItems } from "../Slices/filterSlice";
import { useGetFoodQuery } from "../Slices/foodApiSlice";

const Filter = () => {
    const {data:food,isLoading}=useGetFoodQuery();
    const dispatch=useDispatch();
  return (
    <Container className="mb-4">
        {isLoading ? <p></p> :
      <Row>
        <Col md={12}>
          <Form.Select
            aria-label="Filter"
            size="sm"
            onChange={(e)=>dispatch(filterItems(
                food.filter((food)=>food.name.includes(e.target.value))
            ))}
          >
            <option value="All">All</option>
            <option value="Burger">Burger</option>
            <option value="Pizza">Pizza</option>
            <option value="Mojito">Mojito</option>
          </Form.Select>
        </Col>
      </Row>
}
    </Container>
  );
};

export default Filter;
