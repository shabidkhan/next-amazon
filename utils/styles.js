import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
    navbar:{
        backgroundColor:"#203040",
        "& a":{
            color:"#fff",
            marginLeft:10,
        },
    },
    navbarButton:{
        color:"#fff",
        textTransform:"initial"
    },
    brand:{
        fontSize:"1.5rem",
        fontWeight:"bold",
    },
    grow:{
        flexGrow:1,
    },
    main:{
        minHeight:"80vh",
    },
    footer: {
        textAlign:"center",
    },
    section: {
        marginTop:10,
        marginBottom:10,
    },
    form:{
        maxWidth:800,
        margin:" 0 auto",
    },
    transparentBackground:{
        backgroundColor:"transparent"
    },
    error:{
        color:"#f04040",
    },
    fullWidth:{
        width:"100%", 
    },
    mt1: { marginTop: '1rem' },
        // search
        searchSection: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
        display: 'flex',
        },
    },
    featuredImage: {
        height: '100%',
        width: '100%',
    },
}))

export default useStyles;