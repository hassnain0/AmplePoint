// import { View } from 'react-native';
// import { StripeProvider, initPaymentSheet, useStripe } from '@stripe/stripe-react-native';
// import { useEffect } from 'react';
// import Button from '../components/Button';

// const StripePayement =()=>{
//  useEffect(async()=>{

 
//   const Payment=await stripe.paymentIntents.create({
//     amount,
//     description: "Payment",
//     payment_method: id,
//     confirm: true,
//     return_url,
//     currency,
//     });
// })
//     const onCheckout=async()=>{
//       const initResponse=await initPaymentSheet({
//                 merchantDisplayName:'notJust.dev',
//                 paymentIntentClientSecret:''
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