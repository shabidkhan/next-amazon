// import data from "../../utils/data";
import {useRouter} from "next/router";
import Layout from "../../components/Layout";
import { Button, Card, Grid,  Link, List, ListItem, Typography } from "@material-ui/core";
import NextLink from "next/link";
import useStyles from "../../utils/styles";
import Image from "next/image";
import db from "../../utils/db";
import Product from "../../models/Product";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../../utils/Store";
import { Rating } from "@material-ui/lab";

export const getStaticPaths = async()=>{
    await db.connect();
    const products = await Product.find({},{slug:true}).lean();
    await db.disconnect()
    const paths=products.map(product =>{
        return {
            params: {
                slug:product.slug,
            }
        }
    })
    return {
        paths,
        fallback:false
    }
}
export const getStaticProps = async(context)=>{
    const slug = context.params.slug;
    await db.connect();
    const product = await Product.findOne({ slug }, '-reviews').lean();

    return {
        props:{
            product:db.convertDocToObj(product)
        }
    }
}

export default function ProductScreen({product}) {
    const router = useRouter();
    const {state, dispatch} = useContext(Store );
    const style = useStyles();
    const addToCartHandler = async() => {
        const {data} = await axios.get(`/api/products/${product._id}`)
        const existItem = state.cart.cartItems.find(item => item._id === product._id)
        const quantity = existItem? existItem.quantity+1:1;
        if (data.countInStock<=0 || data.countInStock<quantity) {
            window.alert("Sorry. Product is out of stock")
            
        }else{
           dispatch({type:"CART_ADD_ITEM",payload:{...product, quantity}}) 
        }
        router.push("/cart")
    };
    return (
        <Layout title={product.name} description={product.description}>
            <div className={style.section}>
                <NextLink href="/" passHref>
                    <Link>
                        <Typography>
                            Back to Products
                        </Typography>
                        
                    </Link>
                </NextLink>
            </div>
            <Grid container spacing={1}>
                <Grid item md={6} xs={12}>
                    <Image src={product.image} alt={product.name} width={640} height={640} layout="responsive"/>
                </Grid>
                {/* <Grid> */}
                <Grid item md={3} xs={12}>
                    <List>
                        <ListItem>
                            <Typography component="h1" variant="h1">
                                {product.name}
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Category:{product.category}</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography>Brand:{product.brand}</Typography>
                        </ListItem>
                        <ListItem>
                        <Rating value={product.rating} readOnly></Rating>
                            <Link href="#reviews">
                                <Typography>({product.numReviews} reviews)</Typography>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Typography> Description:{product.description}</Typography>
                        </ListItem>
                    </List>
                </Grid>
                
                {/* </Grid> */}
                <Grid item md={3} xs={12}>
                    <Card>
                        <List>
                            <ListItem>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography>Price</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>${product.price}</Typography>
                                </Grid>
                            </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Status</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Button 
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={addToCartHandler}
                                >
                                    Add to cart
                                </Button>
                                
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    
    )
}
