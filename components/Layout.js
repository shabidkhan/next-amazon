import {useContext, useState} from "react"
import { AppBar, Badge, Button, Container, createTheme,CssBaseline, Link, Menu, MenuItem, Switch, ThemeProvider, Toolbar, Typography } from "@material-ui/core";
// import { createTheme } from '@material-ui/core/styles'
import Head from "next/head";
import useStyles from "../utils/styles";
import NextLink from "next/link";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import dynamic from "next/dynamic"
import { useRouter } from "next/router";


function Layout({title, description,children}) {
  const {state,dispatch} = useContext(Store)
  const {darkMode,cart,userInfo} = state;
  const theme = createTheme({
    typography:{
      h1:{
        fontSize:"1.6rem",
        fontWeight:400,
        margin:"1rem 0",
      },
      h2:{
        fontSize:"1.4rem",
        fontWeight:400,
        margin:"1rem 0",
      }
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  })
  const router = useRouter()
  const styles = useStyles()
  const darkmodeChangeHandler = () =>{
    dispatch({type:darkMode?'DARK_MODE_OFF':'DARK_MODE_ON'})
    const newDarkMode =!darkMode
    Cookies.set("darkMode",newDarkMode?"ON":"OFF")
  }
  const [anchorEl ,setAnchorEl] = useState(null)
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    router.push(redirect)
  }
  
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const logoutClickHandler = ()=> {
    setAnchorEl(null);
    dispatch({type:"USER_LOGOUT"})
    Cookies.remove("userInfo")
    Cookies.remove("cartItems")
    router.push("/")
  }
  return (
    <div>
        <Head>
            <title> {title?`${title} - Next Amazona`:"Next Amazona"}</title>
            {description && <meta name="description" content={description} />}
        </Head>
        <ThemeProvider theme={theme}>
        <CssBaseline/>
          <AppBar position="static" className={styles.navbar}>
            <Toolbar>
              <NextLink href="/" passHref>
                <Link>
                  <Typography className={styles.brand}>amazon</Typography>
                </Link>
              </NextLink>
              <div className={styles.grow}></div>  
              <div>
                <Switch checked={darkMode} onChange={darkmodeChangeHandler}></Switch>
                <NextLink href="/cart" passHref>
                  <Link>
                    {cart.cartItems.length > 0 ? <Badge color="secondary" badgeContent={cart.cartItems.length}>Cart</Badge>:"Cart"} 
                  </Link>
                </NextLink>
                {
                  userInfo?
                  <>
                    <Button 
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    className={styles.navbarButton}
                    >{userInfo.name}</Button>
                    <Menu 
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                    >
                      <MenuItem onClick={e =>loginMenuCloseHandler(e, "/profile")}>Profile</MenuItem>
                      <MenuItem onClick={e => loginMenuCloseHandler(e, "/order-history")}>Order History</MenuItem>
                      <MenuItem onClick={logoutClickHandler}>Log out</MenuItem>
                    </Menu>
                  </>
                  :<NextLink href="/login" passHref>
                    <Link>Login</Link>
                  </NextLink>
                }
                
              </div>
              
            </Toolbar>
          </AppBar>
          <Container className={styles.main}>
            {children}
          </Container>
          <footer className={styles.footer}>
            <Typography>All rights reserved. Next Amazon </Typography>
          </footer>
        </ThemeProvider>
        
    </div>
  )
}


export default dynamic(()=> Promise.resolve(Layout),{ssr:false})