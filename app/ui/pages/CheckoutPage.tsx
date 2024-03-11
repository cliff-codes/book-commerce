'use client'
import React, { FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const CheckoutPage = () => {

  const router = useRouter()

  const [formData, setFormData] = React.useState({
        email: '',
        amount: '',
      });
    
      const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        // Send the form data to your API route
        try {
          const response = await axios.post('/api/payment', {...formData});
   
          if (response.status === 200) {
            // Assuming the API returns a JSON response
            const res = response.data;
            
            // Handle success (redirect to confirmation page)
            const { data } = res;
            const { authorization_url } = data;

            router.push(authorization_url);
          } else {
            throw new Error('An error occurred while processing the payment');
          }

        } catch (error) {
          console.error('Payment error:', error ? error.response?.data : error?.message);
          // Handle errors (e.g., display an error message)
        }
      };

    
      return (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            required
          />
          
          <button type="submit">Pay Now</button>
        </form>
      );
}

export default CheckoutPage