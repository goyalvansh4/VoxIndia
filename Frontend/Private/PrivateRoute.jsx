import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export function ProtectedRoute({ children }) {
  let token = Cookies.get("token"); // Replace 'token' with the key of your token in cookies.
  if(!token){
    const params = new URLSearchParams(window.location.search);
    // console.log(params)
    token = params.get("token");
    if(token){
      Cookies.set("token",token)
    }
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}