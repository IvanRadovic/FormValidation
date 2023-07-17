import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import *  as yup from 'yup'; 

const Form = () => {

  const schema = yup.object().shape({
    fullName: yup.string().required("Your full name is requiered!"),
    email: yup.string().email().required("Email is not valid!"),
    age:yup.number().positive().integer().min(18).required("Age is not valid!"),
    password: yup.string().min(4).max(20).required("Password is weak!"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords don't match")
      .required("Is not same as your password"),
  })

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(data)
      })

      if(response.ok){
        const result = await response.json();
        console.log('Form submitted successfully:', result);
      } else {
        console.error('Error submitting form');
      }
    } catch (error) {
      console.log('Error submiting form', error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='text' placeholder="Full name.." {...register("fullName")}/>
      <p>{errors.fullName?.message}</p>
      <input type='text' placeholder="Email.." {...register("email")} />
      <p>{errors.email?.message}</p>
      <input type='number' placeholder="Age.." {...register("age")} />
      <p>{errors.age?.message}</p>
      <input type='password' placeholder="Password..." {...register("password")} />
      <p>{errors.password?.message}</p>
      <input type='password' placeholder="Confirm Password..." {...register("confirmPassword")} />
      <p>{errors.confirmPassword?.message}</p>
      <input type='submit' />
    </form>
  )
}

export default Form