import {Stripe} from 'stripe'


if(!process.env.STRIPE_SECRET_KEY){
    throw new Error ("Stripe secret key is not set")
}
const stripe =new Stripe(process.env.STRIPE_SECRET_KEY!,{
    apiVersion:'2024-10-28.acacia' //latest api version
})
export default stripe;