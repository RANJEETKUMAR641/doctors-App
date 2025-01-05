import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { hideLoading, showLoading } from "../redux/alertSlice";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && localStorage.getItem("token")) {
      const fetchUser = async () => {
        try {
          dispatch(showLoading());
          const response = await axios.get("/api/user/get-user-by-id", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          dispatch(hideLoading());
          if (response.data.success) {
            dispatch(setUser(response.data.data));
          } else {
            navigate("/login");
          }
        } catch (error) {
          dispatch(hideLoading());
          navigate("/login");
        }
      };
      fetchUser();
    }
  }, [dispatch, user, navigate]);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return user ? children : <div>Loading...</div>;
};


export default ProtectedRoute;
