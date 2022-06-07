import { List, ListItem, TextField, Typography, Button, Link } from "@material-ui/core";
import Layout from "../components/Layout";
import useStyles from "../utils/styles"
import NextLink from "next/link"
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Store } from "../utils/Store";
import {useRouter} from "next/router";
import Cookies from "js-cookie";
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from "notistack";
import CheckoutWizard from "../components/CheckoutWizard";


export default function Login() {
    const {
        handleSubmit,
        control,
        formState: { errors },
      } = useForm();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const router = useRouter();
    const {redirect} = router.query; //login?redirect=/shipping
    const {state,dispatch} = useContext(Store)
    const {userInfo} = state;
    useEffect(() => {
        if(userInfo){
            router.push( "/")
        }
    }, []);
    
    // if(userInfo){
    //     router.push(redirect || "/")
    // }
    const styles = useStyles()
    const submitHandler = async ({email, password}) => {
        closeSnackbar();
        try {
            const {data} = await axios.post("/api/users/login",{email, password})
            dispatch({type:"USER_LOGIN",payload:data})
            Cookies.set("userInfo",JSON.stringify(data))
            router.push(redirect || "/")
            
        } catch (error) {
            enqueueSnackbar(error.response.data?error.response.data.message:error.message,
            {variant:"error"}
                )
        }
        

    }
  return (
    <Layout title="Login">
    {redirect==="/shipping" && <CheckoutWizard/>}
        <form onSubmit={handleSubmit(submitHandler) } className={styles.form}>
            <Typography>
                Login
            </Typography>
            <List>
                <ListItem>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        }}
                        render={({ field }) => (
                            <TextField
                            variant="outlined"
                            fullWidth
                            id="email"
                            label="Email"
                            inputProps={{ type: 'email' }}
                            error={Boolean(errors.email)}
                            helperText={
                                errors.email
                                ? errors.email.type === 'pattern'
                                    ? 'Email is not valid'
                                    : 'Email is required'
                                : ''
                            }
                            {...field}
                            ></TextField>
                        )}
                        ></Controller>
                </ListItem>
                 <ListItem>
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                            minLength: 6,
                        }}
                        render={({ field }) => (
                            <TextField
                            variant="outlined"
                            fullWidth
                            id="password"
                            label="Password"
                            inputProps={{ type: 'password' }}
                            error={Boolean(errors.password)}
                            helperText={
                                errors.password
                                ? errors.password.type === 'minLength'
                                    ? 'Password length is more than 5'
                                    : 'Password is required'
                                : ''
                            }
                            {...field}
                            ></TextField>
                        )}
                        ></Controller>
                    
                </ListItem>
                <ListItem>
                    <Button variant="contained" type="submit" fullWidth color="primary">
                        Login
                    </Button>
                </ListItem>
                <ListItem>
                    Don&apos;t have an account?&nbsp; <NextLink href={`/register?redirect=${redirect || "/"}`}>
                        <Link>
                            Register    
                        </Link>
                    </NextLink>
                </ListItem>
            </List>
        </form>
    </Layout>
  )
}
