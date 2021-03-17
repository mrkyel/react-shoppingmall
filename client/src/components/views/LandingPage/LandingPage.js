import React, { useEffect } from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    axios.post("/api/product/products").then((res) => {
      if (res.data.success) {
        console.log(res.data);
      } else {
        alert("상품들을 가져오는데 실패하였습니다");
      }
    });
  }, []);
  return <div>LandingPage</div>;
}

export default LandingPage;
