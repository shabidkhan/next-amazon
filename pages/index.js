import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Link, Typography } from '@material-ui/core'
// import Head from 'next/head'
// import Image from 'next/image'
import Layout from '../components/Layout';
// import styles from '../styles/Home.module.css'
// import data from "../utils/data";
import axios from "axios";
import NextLink from "next/link";
import Product from '../models/Product';
import db from '../utils/db';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import Carousel from 'react-material-ui-carousel';
import ProductItem from '../components/ProductItem';
import useStyles from '../utils/styles';



export const getStaticProps = async()=>{
  await db.connect();
  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    '-reviews'
  )
    .lean()
    .limit(3);
  const topRatedProductsDocs = await Product.find({}, '-reviews')
    .lean()
    .sort({
      rating: -1,
    })
    .limit(6);
  await db.disconnect();
  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
    },
  };
}


export default function Home({topRatedProducts, featuredProducts}) {
  const router = useRouter()
  const {state,dispatch} = useContext(Store)
  const styles = useStyles();
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock<=0 || data.countInStock<quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }else{
      dispatch({type:"CART_ADD_ITEM",payload:{...product, quantity}}) 
   }
    router.push('/cart');
  }
  return (
    <Layout>
      <Carousel className={styles.mt1} animation="slide">
        {featuredProducts.map((product) => (
          <NextLink
            key={product._id}
            href={`/product/${product.slug}`}
            passHref
          >
            <Link>
              <img
                src={product.featuredImage}
                alt={product.name}
                className={styles.featuredImage}
              ></img>
            </Link>
          </NextLink>
        ))}
      </Carousel>
      <Typography variant="h2">Popular Products</Typography>
      <Grid container spacing={3}>
        {topRatedProducts.map((product) => (
          <Grid item md={4} key={product.name}>
            <ProductItem
              product={product}
              addToCartHandler={addToCartHandler}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
    
  )
}
