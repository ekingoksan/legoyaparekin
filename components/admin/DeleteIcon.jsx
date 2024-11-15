"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
  
import React from 'react'

const DeleteIcon = ({handleDelete, buttonText="Sil", deleteMessage="Silmek istediğinize emin misiniz?"}) => {
  
  return (
    <Popover>
        <PopoverTrigger>
            <i className="bi bi-trash3 text-red-500 cursor-pointer"></i>
        </PopoverTrigger>
        <PopoverContent>
            <div className="p-4 bg-white">
                <p className="text-sm text-gray-500">{deleteMessage}</p>
                <div className="flex justify-center mt-4">
                    <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-lg">{buttonText}</button>
                </div>
            </div>
        </PopoverContent>
    </Popover>

  )
}

export default DeleteIcon
