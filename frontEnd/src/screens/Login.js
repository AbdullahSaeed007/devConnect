import React, { useEffect, useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Logo.png";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { login, clearErrors } from "../actions/userActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/");
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="min-h-screen items-center bg-radial-gradient">
            <div className="w-screen flex flex-col">
              <img
                src={logo}
                alt="Logo"
                className="w-auto h-24 py-8 md:mb-20 mb-5 object-contain"
              />
            </div>
            <div className="flex justify-center">
              <div className="bg-white p-8 rounded-2xl shadow-2xl md:w-1/4 md:min-w-96 w-11/12">
                <h2 className="text-3xl font-bold mb-5 text-gray-800 text-left">
                  Welcome Back!
                </h2>
                <p className="text-#B0B0B0 mb-5">
                  Please enter your credentials to access your account. If
                  you're new here, feel free to{" "}
                  <Link
                    to="/signup"
                    className="text-#525CEB underline font-bold"
                  >
                    sign up
                  </Link>{" "}
                  and join our community.
                </p>
                <form className="space-y-4" onSubmit={submitHandler}>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-lg font-bold text-gray-700 block"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="xyz@gmail.com"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg mt-1"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="text-lg font-bold text-gray-700 block"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="************"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg mt-1"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Link to="/password/forget" className="float-right mb-4">
                    forgot password?
                  </Link>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-br from-#525CEB via-#6D77FF to-#6B74F5EB rounded-md text-white text-sm"
                    // onClick={() => navigate("/")}
                  >
                    <h2 className="font-bold text-white text-lg">Login</h2>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
