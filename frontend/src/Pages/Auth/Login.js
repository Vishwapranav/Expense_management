import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginAPI } from "../../utils/ApiRequest";
import "./LoginPage.css"; // New CSS file for custom styles

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
  
    setLoading(true);
  
    try {
      const { data } = await axios.post(loginAPI, { email, password });
  
      if (data.success === true) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message, toastOptions);
        navigate("/");
      } else {
        toast.error(data.message || "Invalid credentials", toastOptions);
      }
    } catch (error) {
      // Show error toast if there's an issue with the request
      toast.error("Something went wrong. Please try again.", toastOptions);
    } finally {
      // Ensure loading state is reset regardless of success or failure
      setLoading(false);
    }
  };
  

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);

  return (
    <div className="login-page-wrapper">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#000",
            },
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: 200,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#00ffcc",
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.7,
              random: true,
            },
            size: {
              value: 4,
              random: { enable: true, minimumValue: 1 },
            },
            links: {
              enable: false,
            },
            move: {
              enable: true,
              speed: 3,
            },
            life: {
              duration: {
                sync: false,
                value: 3,
              },
              count: 0,
              delay: {
                random: {
                  enable: true,
                  minimumValue: 0.5,
                },
                value: 1,
              },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <Container className="login-container">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div className="form-box">
              <h1 className="text-center">
                <AccountBalanceWalletIcon
                  sx={{ fontSize: 50, color: "#ff6600" }}
                  className="icon-glow"
                />
              </h1>
              <h2 className="text-center login-title">Welcome Back!</h2>
              <Form>
                <Form.Group controlId="formBasicEmail" className="mt-3">
                  <Form.Label className="input-label">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    className="input-field"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <Form.Label className="input-label">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={values.password}
                    className="input-field"
                  />
                </Form.Group>

                <div className="form-links mt-4">
                  <Link to="/forgotPassword" className="forgot-link">
                    Forgot Password?
                  </Link>

                  <Button
                    type="submit"
                    className="login-btn mt-3"
                    onClick={!loading ? handleSubmit : null}
                    disabled={loading}
                  >
                    {loading ? "Signing in…" : "Login"}
                  </Button>

                  <p className="mt-3 account-text">
                    Don't Have an Account?{" "}
                    <Link to="/register" className="register-link">
                      Register
                    </Link>
                  </p>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Login;
