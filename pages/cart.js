import { Button, Card, Grid, Link, List, ListItem, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import NextLink from "next/link";
import dynamic from 'next/dynamic';
import Image from 'next/image';
// import axios from 'axios';
import { useRouter } from 'next/router';
function CartScreen() {
  const {state,dispatch} =useContext(Store);
  const {cartItems} = state.cart
  const router = useRouter()
  const updateCartHandler = async (item,quantity)=>{
    // const {data} = await axios.get()
    if(item.countInStock<=0 || item.countInStock<quantity){
      window.alert("Sorry. product is not available")
      return;
    }else{
          dispatch({type:"CART_ADD_ITEM",payload: {...item,quantity}})
    }
  }
  const removeItemHandler = (item) => {
    dispatch({type:"CART_REMOVE_ITEM",payload: item})
  }
  const checkoutHandler = ()=>{
    router.push("/shipping")
  }
  return (
    <Layout title="Shopping Cart">
      <Typography component="h1" variant="h1">
        Shopping Cart
      </Typography>
      {
        
        cartItems.length ===0?
        (
          <div>
            Cart is empty. 
            <NextLink href="/" passHref>
              <Link> Go Shopping</Link>
            </NextLink>
          </div>
        ):
        (
          <Grid container spacing={1}>
            <Grid item md={9} xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      cartItems.map(item =>(
                        <TableRow key={item._id}>
                          <TableCell>
                            <NextLink href={`procudts/${item.slug}`} passHref>
                              <Link>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={50}
                                  height={50}
                                />
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell>
                          <NextLink href={`products/${item.slug}`} passHref>
                              <Link>
                                <Typography>{item.name}</Typography>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell align="right">
                            <Select value={item.quantity} onChange={e=>updateCartHandler(item, e.target.value)}>

                              {[...Array(item.countInStock).keys()].map(x=>(
                                <MenuItem key={x+1} value={x+1}>
                                  {x+1}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>
                          <TableCell align="right">
                            {item.price}
                          </TableCell>
                          <TableCell align="right">
                            <Button variant="contained" color="secondary" onClick={() =>removeItemHandler(item)}>
                              x
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={3} xs={12} >
              <Card>
                <List>
                  <ListItem>
                    <Typography variant="h2">
                      SubTotal Amount ({cartItems.reduce((total,currEle)=>total + currEle.quantity,0)}{" "}Items): $
                      {
                        cartItems.reduce((total,currEle)=>total + currEle.quantity*currEle.price,0)
                      } 
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    onClick={checkoutHandler}
                    >Checkout</Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        )
      }
    </Layout>
  )
}


export default dynamic(()=> Promise.resolve(CartScreen),{ssr:false})