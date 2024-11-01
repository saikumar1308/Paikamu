import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json());

app.post("/sbiwebhook",async (req,res)=>{
    const paymentInfo:{
        token:string;
        userId:string;
        amount:string
    } = {
        token: req.body.token,
        userId: req.body.user_id,
        amount:req.body.amount
    };

    try {
        await db.$transaction([
            db.balance.updateMany({
                where:{
                    userId:Number(paymentInfo.userId)
                },
                data: {
                    amount:{
                        increment:Number(paymentInfo.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where:{
                    token:paymentInfo.token
                },
                data:{
                    status:"Success"
                }
            })
        ]);
        res.json({
            message:"Captured"
        })
    }catch(e){
        console.error(e);
        res.status(411).json({
            message:"Error while processing webhook"
        })
    }
})

app.listen(3003);