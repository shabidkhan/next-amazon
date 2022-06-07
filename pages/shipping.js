import { List, ListItem, TextField, Typography, Button, Link } from "@material-ui/core";
import Layout from "../components/Layout";
import useStyles from "../utils/styles"
import { useContext, useState, useEffect } from "react";
import { Store } from "../utils/Store";
import {useRouter} from "next/router";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import CheckoutWizard from "../components/CheckoutWizard";

export default function Shipping() {
    const router = useRouter();
    const {redirect} = router.query; //login?redirect=/shipping
    const {state,dispatch} = useContext(Store)
    const {userInfo, cart: {shippingAddress}} = state;
    const {
      handleSubmit,
      control,
      setValue,
      formState: { errors },
    } = useForm();
    const styles = useStyles()
    useEffect(() => {
        if (!userInfo){
          router.push("/login?redirect=/shipping");
        }
        setValue("fullName",shippingAddress.fullName)
        setValue("address",shippingAddress.address)
        setValue("city",shippingAddress.city)
        setValue("pastalCode",shippingAddress.pastalCode)
        setValue("country",shippingAddress.country)
    }, []);
    
    
    
    const submitHandler =  ({fullName, address, city, postalCode, country}) => {
        const data = {fullName, address, city, postalCode, country}
        dispatch({type:"SAVE_SHIPPING_ADDRESS",payload:data})
        Cookies.set("shippingAddress",JSON.stringify(data))
        router.push( "/payment")
        
    }
  return (
    <Layout title="Shippin Address">
      <CheckoutWizard activeStep={1} />
        <form onSubmit={handleSubmit(submitHandler) } className={styles.form}>
            <Typography>
                Shipping Address
            </Typography>
            <List>
            {/* Name */}
            <ListItem>
                    <Controller
                        name="fullName"
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
                            id="fullName"
                            label="Full Name"
                            error={Boolean(errors.fullName)}
                            helperText={
                                errors.fullName
                                ? errors.fullName.type === 'minLength'
                                    ? 'Full Name length is more than 1'
                                    : 'Full Name is required'
                                : ''
                            }
                            {...field}
                            ></TextField>
                        )}
                        ></Controller>
                </ListItem>
                {/* Address */}
                <ListItem>
                    <Controller
                        name="address"
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
                            id="address"
                            label="Address"
                            error={Boolean(errors.address)}
                            helperText={
                                errors.address
                                ? errors.address.type === 'minLength'
                                    ? 'Address length is more than 1'
                                    : 'Address is required'
                                : ''
                            }
                            {...field}
                            ></TextField>
                        )}
                        ></Controller>
                </ListItem>
                {/* City */}
                <ListItem>
                    <Controller
                        name="city"
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
                            id="city"
                            label="City"
                            error={Boolean(errors.city)}
                            helperText={
                                errors.city
                                ? errors.city.type === 'minLength'
                                    ? 'City length is more than 1'
                                    : 'City is required'
                                : ''
                            }
                            {...field}
                            ></TextField>
                        )}
                        ></Controller>
                </ListItem>
                {/* Pastal Code */}
                <ListItem>
                    <Controller
                        name="postalCode"
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
                            id="postalCode"
                            label="Postal Code"
                            error={Boolean(errors.postalCode)}
                            helperText={
                                errors.postalCode
                                ? errors.postalCode.type === 'minLength'
                                    ? 'Postal Code length is more than 1'
                                    : 'Postal Code is required'
                                : ''
                            }
                            {...field}
                            ></TextField>
                        )}
                        ></Controller>
                </ListItem>
                {/* Country */}
                <ListItem>
                    <Controller
                        name="country"
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
                            id="country"
                            label="Country"
                            error={Boolean(errors.country)}
                            helperText={
                                errors.country
                                ? errors.country.type === 'minLength'
                                    ? 'Country length is more than 1'
                                    : 'Country is required'
                                : ''
                            }
                            {...field}
                            ></TextField>
                        )}
                        ></Controller>
                </ListItem>
                
                <ListItem>
                    <Button variant="contained" type="submit" fullWidth color="primary">
                        Continue
                    </Button>
                </ListItem>
                
            </List>
        </form>
    </Layout>
  )
}
