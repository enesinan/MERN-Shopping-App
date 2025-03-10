import React, { useEffect, useState } from "react";
// Components
import Navbar from "../../components//Navbar";
import Announcement from "../../components//Announcement";
import Newsletter from "../../components//Newsletter";
import Footer from "../../components//Footer";
// Material UI Icons
import { Add, Remove } from "@material-ui/icons";
// React Router
import { useLocation } from "react-router";
// Axios
import { publicRequest } from "../../requestMethods";
// Redux
import { addProduct } from "../../redux/cartRedux";
import { useDispatch } from "react-redux";
// Styled Components
import {
  AddContainer,
  Amount,
  AmountContainer,
  Button,
  Container,
  Desc,
  Filter,
  FilterColor,
  FilterContainer,
  FilterSize,
  FilterSizeOption,
  FilterTitle,
  Image,
  ImageContainer,
  InfoContainer,
  Price,
  Title,
  Wrapper,
} from "./SingleProduct.styles";

const SingleProduct = () => {
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const location = useLocation();
  const productId = location.pathname.split("/").pop();


  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await publicRequest.get("/products/find/" + productId);
        setProduct(response.data);
      } catch (err) {}
    };
    getProduct();
  }, [productId]);

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  console.log(color);
  return (
    <Container>
      {!product ? (
        <>Loading...</>
      ) : (
        <>
          <Navbar />
          <Announcement />
          <Wrapper>
            <ImageContainer>
              <Image src={product.img} />
            </ImageContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Desc>{product.desc}</Desc>
              <Price>$ {product.price}</Price>
              <FilterContainer>
                <Filter>
                  <FilterTitle>Colors: </FilterTitle>
                  {product.color.map((availableColor) => (
                    <FilterColor
                      color={availableColor}
                      choosen={color}
                      key={availableColor}
                      onClick={() => {
                        setColor(availableColor);
                      }}
                    />
                  ))}
                </Filter>
                <Filter>
                  <FilterTitle>Size</FilterTitle>
                  <FilterSize onChange={(event) => setSize(event.target.value)}>
                    <FilterSizeOption defaultValue>Size</FilterSizeOption>
                    {product.size.map((size) => (
                      <FilterSizeOption value={size} key={size}>
                        {size}
                      </FilterSizeOption>
                    ))}
                  </FilterSize>
                </Filter>
              </FilterContainer>
              <AddContainer>
                <AmountContainer>
                  <Remove
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    style={{ cursor: "pointer" }}
                  />
                  <Amount>{quantity}</Amount>
                  <Add
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ cursor: "pointer" }}
                  />
                </AmountContainer>
                <Button onClick={handleClick}>ADD TO CART</Button>
              </AddContainer>
            </InfoContainer>
          </Wrapper>
          <Newsletter />
          <Footer />
        </>
      )}
    </Container>
  );
};

export default SingleProduct;
