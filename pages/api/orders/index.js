import nc from "next-connect";
import db from "../../../utils/db";
import Order from "../../../models/Order";
import { isAuth } from "../../../utils/auth";
import {onError} from "../../../utils/error";

const handler = nc({
    onError
});
handler.use(isAuth)
handler.post(async(req, res) => {
    await db.connect();
    console.log(req.body);
    const newOrder = new Order({
        ...req.body,
        user: req.user._id,
    })
    const order = await newOrder.save()
    await db.disconnect();
    res.status(201).send(order)
})

export default handler;