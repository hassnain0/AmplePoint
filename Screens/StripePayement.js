// import { StripeProvider, initPaymentSheet } from '@stripe/stripe-react-native';
// import { View } from 'react-native';
// import { useStripe } from '@stripe/stripe-react-native';
// import { useEffect } from 'react';
// import Button from '../components/Button';

// const StripePayement =()=>{
//  const stripe=require('stripe')('sk_test_51NpOZ4GY4n5u6WbIGKHcQBoih6sUZRXtG2a3qWq6NKqOMLrdPSo1DElWPfc0N4cBMrYLYmlUj25gqGHn1tmlmkoL00kNdf7OkS');

 
//     const payementIntent=stripe.payementIntents.create({
//      amount:100,
//      currency:'usd',
//      automatic_payement_methids:{
//         enable:true,
//      }
//     })

//     const onCheckout=async()=>{
//       const initResponse=await initPaymentSheet({
//                 merchantDisplayName:'notJust.dev',
//                 paymentIntentClientSecret:payementIntent,
                
//              })    
//         console.log(initResponse)

//         await presentPaymentSheet();
        
//     }
//     const {initPaymentSheet,presentPaymentSheet}=useStripe();
//     const Stripe_Key='pk_test_51 NpOZ4GY4n5u6WbIlWOsccAKTTMLq7xnjfG8fFboidp6jZCx2XlssuBHyNbvBsqfGDkbVkZH2Knka498eIzAjdPZ00YZBjdzik';
//     return(
//        <View>
//         <Button 
//                   btnPress={onCheckout}
//                   label={"Pay"}
//                 />
//        </View>
//         )
// }
// export default StripePayement;