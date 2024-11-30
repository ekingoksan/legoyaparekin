"use client"

import { editImage } from '@/actions/admin/customer-review/edit/editImage'
import { GetImage } from '@/actions/admin/customer-review/get/getImage'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const ChangeImage = () => {
  const [images, setImages] = useState(null)
  const imageInputRef = useRef();

  const {toast} = useToast()
  const fetchImages = async () => {
    try {
      const res = await GetImage()
      setImages(res);

    } catch (error) {
      console.log(error)
    }
  }

  const handleImageChange = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);

    const res = await editImage(formData)
    await fetchImages()
    if(res.status === 200){
      return toast({
          title: 'Başarılı',
          description: res.message,
          variant: 'success',
          duration: 2000,
      });
  }else{
      return toast({
          title: 'Hata',
          description: res.message,
          variant: 'destructive',
          duration: 2000,
      });
  }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  return (
    <div>
        <div className='flex flex-col gap-3'>
            <h1 className="text-xl font-semibold">Müşteri Yorumları Resmi</h1>
            <div className="flex items-center gap-5">
                {
                    images && images.image && (
                        <Image src={`/images/site/${images.image}`} width={100} height={100} className='object-contain' alt="Customer Review Image" />
                    )
                }
                <Button onClick={() => imageInputRef.current.click()}>Resmi Değiştir</Button>
                <input type="file" ref={imageInputRef} className="hidden" onChange={handleImageChange} />
            </div>
        </div>
    </div>
  )
}

export default ChangeImage
