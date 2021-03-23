import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import { continents } from "./Sections/Datas";

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    continents: [],
    price: [],
  });

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProducts = (body) => {
    axios.post("/api/product/products", body).then((res) => {
      if (res.data.success) {
        console.log(body, res.data.productInfo);
        if (body.loadMore) {
          setProducts([...products, ...res.data.productInfo]);
        } else {
          setProducts(res.data.productInfo);
        }
        setPostSize(res.data.postSize);
      } else {
        alert("상품들을 가져오는데 실패하였습니다");
      }
    });
  };

  const loadMoreHanlder = () => {
    let skip = Skip + Limit;
    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };

    getProducts(body);
    setSkip(skip);
  };

  const renderCards = products.map((item, idx) => {
    return (
      <Col lg={6} md={8} xs={24} key={idx}>
        <Card
          cover={
            <ImageSlider images={item.images} />
            // <img
            //   style={{ width: '100%', maxHeight: '150px'}}
            //   alt={"여행사진"}
            //   src={`http://localhost:5000/${item.images[0]}`}
            // />
          }
        >
          <Meta title={item.title} description={`$${item.price}`} />
        </Card>
      </Col>
    );
  });

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };

    newFilters[category] = filters;

    console.log("filters", filters);

    // if (category === "price") {
    //     let priceValues = handlePrice(filters)
    //     newFilters[category] = priceValues
    // }
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const showFilteredResults = (filters) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };

    getProducts(body);
    setSkip(0);
  };

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Travel Anywhere
          <Icon type="rocket" />
        </h2>
      </div>

      {/* filter */}

      {/* Checkbox */}
      <CheckBox
        list={continents}
        handleFilters={(filters) => handleFilters(filters, "continents")}
      />

      {/* RadioBox */}

      {/* Search */}

      {/* Cards */}

      <Row gutter={[16, 16]}>{renderCards}</Row>

      <br />

      {PostSize >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadMoreHanlder}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
