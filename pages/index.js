import React from "react";

import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ products, bannerData }) => (
  <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
    <div className="products-heading">
      <h2>Best Seller Products</h2>
      <p>hot items sold</p>
    </div>

    <div className="products-container">
      {products.length < 6
        ? products?.map((product) => (
            <Product
              key={product._id}
              product={product}
              width={100}
              height={100}
            />
          ))
        : products
            ?.slice(0, 6)
            .map((product) => (
              <Product
                key={product._id}
                product={product}
                width={100}
                height={100}
              />
            ))}
    </div>
    <div>
      <div className="products-list-heading">
        <h2>All Products</h2>
        <p>find what you like and buy it with amazing discounts</p>
      </div>
      <div className="products-list">
        {products?.map((product) => (
          <Product
            key={product._id}
            product={product}
            width={200}
            height={200}
          />
        ))}
      </div>
    </div>

    <FooterBanner footerBanner={bannerData && bannerData[1]} />
  </div>
);

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
