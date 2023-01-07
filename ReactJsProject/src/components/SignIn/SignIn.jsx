import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function SignIn() {
  const navigate = useNavigate();
  return (
    <Container>
      <Form>
        <h1 className="text-center mt-4">Please SignIn Here!</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          size="lg"
          className="text-center"
        >
          SignIn
        </Button>
      </Form>
      <p className="text-end">
        <span>Yet not Register?</span>{" "}
        <Button
          onClick={() => {
            navigate("/signUp");
          }}
        >
          Register
        </Button>
      </p>
    </Container>
  );
}

export default SignIn;
