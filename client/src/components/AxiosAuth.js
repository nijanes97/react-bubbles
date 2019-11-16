import React from 'react'
import axios from "axios";

const axioWithAuth = () => {
    return axios.create({
      headers: {
        authorization: sessionStorage.getItem("token")
      }
    });
};

export default axioWithAuth;