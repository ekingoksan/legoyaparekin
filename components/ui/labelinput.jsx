"use client"
import React from 'react'
import { Label } from './label'
import { Input } from './input'
import { useForm } from 'react-hook-form'

const LabelInput = ({labelText, type, name, formRegister, placeholder, clName}) => {
    const form = useForm();
  return (
    <div className='flex items-center gap-3 border border-gray-200 px-3 rounded-md'>
        <Label>{labelText}</Label>
        <Input 
            type={type}
            name={name}
            {...form.register(formRegister)}
            placeholder={placeholder}
            className={clName}
        />
    </div>
  )
}

export default LabelInput
