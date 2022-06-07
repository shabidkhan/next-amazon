import { List, ListItem, TextField, Typography, Button, Link } from "@material-ui/core";
import Layout from "../components/Layout";
import useStyles from "../utils/styles"
import NextLink from "next/link"
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Store } from "../utils/Store";
import {useRouter} from "next/router";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

export default function Register() {
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
    const {
        handleSubmit,
        control,
        formState: { errors },
      } = useForm();
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const submitHandler = async ({name, email, password, confirmPassword}) => {
        closeSnackbar();
        if (password!== confirmPassword){
          enqueueSnackbar("Password don't match",{variant: "error"})
          return;
        }
        try {
            const {data} = await axios.post("/api/users/register",{name, email, password})
            dispatch({type:"USER_LOGIN",payload:data})
            Cookies.set("userInfo",JSON.stringify(data))
            router.push(redirect || "/")
            
        } catch (error) {
            alert(error.message)
        }
        

    }
  return (
    <Layout title="Login">
        <form onSubmit={handleSubmit(submitHandler) } className={styles.form}>
            <Typography>
                Register
            </Typography>
            <List>
            <ListItem>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                            minLength: 2,
                        }}
                        render={({ field }) => (
                            <TextField
                            variant="outlined"
                            fullWidth
                            id="name"
                            label="Name"
                            inputProps={{ type: 'text' }}
                            error={Boolean(errors.name)}
                            helperText={
                                errors.name
                                ? errors.name.type === 'minLength'
                                    ? 'Name length is more than 1'
                                    : 'Name is required'
                                : ''
                            }
                            {...field}
                            ></TextField>
                        )}
                        ></Controller>
                </ListItem>
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
                    <Controller
                        name="confirmPassword"
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
                            id="confirmPassword"
                            label="Confirm Password"
                            inputProps={{ type: 'password' }}
                            error={Boolean(errors.confirmPassword)}
                            helperText={
                                errors.confirmPassword
                                ? errors.confirmPassword.type === 'minLength'
                                    ? 'Confirm Password length is more than 5'
                                    : 'Confirm Password is required'
                                : ''
                            }
                            {...field}
                            ></TextField>
                        )}
                        ></Controller>
                    
                </ListItem>
                <ListItem>
                    <Button variant="contained" type="submit" fullWidth color="primary">
                        Register
                    </Button>
                </ListItem>
                <ListItem>
                    Already have an account?&nbsp; <NextLink href= {`/login?redirect=${redirect || "/"}`}>
                        <Link>
                            Login    
                        </Link>
                    </NextLink>
                </ListItem>
            </List>
        </form>
    </Layout>
  )
}
