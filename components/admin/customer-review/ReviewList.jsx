"use client"

import React, { useEffect, useState } from 'react'
import DeleteIcon from '../DeleteIcon'
import { GetReviews } from '@/actions/admin/customer-review/get/getReviews'
import { DataTable } from '@/components/DataTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import SpanButton from '@/components/ui/spanButton'
import { useToast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { deleteReview } from '@/actions/admin/customer-review/delete/deleteReview'
import { addReview } from '@/actions/admin/customer-review/add/addReview'
import { editReview } from '@/actions/admin/customer-review/edit/editReview'

const ReviewList = () => {

  const [data, setData] = useState([])
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(1);
  const [editData, setEditData] = useState(null);


  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      name_surname: '',
      job_title: '',
      description: ''
    }
  })

  const onEdit = (data) => {
    setAction(2)
    form.setValue('name_surname', data.name_surname)
    form.setValue('job_title', data.job_title)
    form.setValue('description', data.description)
    setEditData(data)
    setOpen(true)
  }

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append('name_surname', data.name_surname)
    formData.append('job_title', data.job_title)
    formData.append('description', data.description)
    if (action === 1) {
      // Add Review
      const res = await addReview(formData)

      if (res.status === 200) {
        await fetchData()
        setOpen(false)
        form.reset()
        setAction(1)

        return toast({
          title: 'Başarılı',
          description: res.message,
          variant: 'success',
          duration: 2000,
        });
      }else{
        return toast({
          title: 'Başarısız',
          description: res.message,
          variant: 'destructive',
          duration: 2000,
        });
      }
    } else {
      // Edit Review
      formData.append('id', editData.id)
      const res = await editReview(formData)
      if (res.status === 200) {
        await fetchData()
        setOpen(false)
        setAction(1)
        setEditData(null)
        form.reset()
        return toast({
          title: 'Başarılı',
          description: res.message,
          variant: 'success',
          duration: 2000,
        });
      }else{
        return toast({
          title: 'Başarısız',
          description: res.message,
          variant: 'destructive',
          duration: 2000,
        });
      }
    }
  }

  const columns = [
    {
      id: "name_surname",
      header: () => <div>İsim Soyisim</div>,
      cell: ({ row }) => {
        const data = row.original

        return (
          <div className="flex items-center">
            <span className="ml-2 font-semibold">{data.name_surname}</span>
          </div>
        )
      }
    },
    {
      id: "job",
      header: () => <div>İş</div>,
      cell: ({ row }) => {
        const data = row.original

        return (
          <div className="flex items-center">
            <span className="ml-2 font-semibold">{data.job_title}</span>
          </div>
        )
      }
    },
    {
      id: "review",
      header: () => <div>Yorum</div>,
      cell: ({ row }) => {
        const data = row.original

        return (
          <div className="flex items-center">
            <span className="ml-2 font-semibold">{data.description}</span>
          </div>
        )
      }
    },
    {
      id: "actions",
      header: () => <div>İşlemler</div>,
      cell: ({ row }) => {
        "use client"
        const data = row.original

        return (
          <div className='flex gap-3'>
            <i onClick={() => onEdit(data)} className="bi bi-pencil-square text-blue-500 cursor-pointer"></i>
            <div>
              <DeleteIcon handleDelete={() => onDelete(data.id)} />
            </div>
          </div>
        )
      },
    },
  ]

  const onDelete = async (id) => {
    const res = await deleteReview(id)
    if (res.status === 200) {
      await fetchData()
      return toast({
        title: 'Başarılı',
        description: res.message,
        variant: 'success',
        duration: 2000,
      });
    }else{
      return toast({
        title: 'Başarısız',
        description: res.message,
        variant: 'danger',
        duration: 2000,
      });
    }
  }

  const fetchData = async () => {
    const res = await GetReviews()
    setData(res)
  }


  useEffect(() => {
    fetchData()
  }, [])


  return (
    <div className='mt-5'>
      <div className="flex justify-end mb-3">
        <Button onClick={() => {setOpen(true);}} className="btn btn-primary">Yeni Yorum Ekle</Button>
      </div>
      <Sheet className="p-0" open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" close={false} className="h-[100vh] p-0 overflow-y-auto bg-gray-100">
          <SheetHeader className="border-b p-0 bg-gray-800 text-white px-6 py-3 flex flex-row justify-between items-center space-y-0">
            <SheetTitle className="text-white">
              {action === 1 ? 'Yeni Yorum Ekle' : 'Ylog Düzenle'}
            </SheetTitle>
            <SheetClose className="text-white" onClick={() => form.reset()}>
              <SpanButton className="bg-transparent border border-gray-400 py-1 px-3 text-xs" size="sm">
                <i className="bi bi-x text-xl"></i>
              </SpanButton>
            </SheetClose>
          </SheetHeader>
          <div className='mt-5 mx-6 bg-white p-6 rounded-md'>
            <div className='mb-5'>
              <SheetDescription className="text-xl font-semibold">
                {action === 1 ? 'Yeni Yorum Ekle' : 'Yorum Düzenle'}
              </SheetDescription>
              <SheetDescription className="text-sm text-gray-500">
              </SheetDescription>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex flex-col gap-1 mb-5'>
                <Label>İsim Soyisim</Label>
                <Input
                  type="text"
                  name="title"
                  {...form.register('name_surname')}
                  placeholder="İsim Soyisim"
                  className="w-full"
                />
              </div>
              <div className='flex flex-col gap-1 mb-5'>
                <Label>Meslek</Label>
                <Input
                  type="text"
                  name="title"
                  {...form.register('job_title')}
                  placeholder="Meslek"
                  className="w-full"
                />
              </div>
              <div className='flex flex-col gap-1 mb-5'>
                <Label>Müşteri Yorumu</Label>
                <Textarea
                  type="text"
                  name="title"
                  {...form.register('description')}
                  placeholder="Müşteri Yorumu"
                  className="w-full"
                />
              </div>
              <div className='flex justify-end mt-5'>
                <Button variant="primary" size="lg">Kaydet</Button>
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
      <DataTable columns={columns} data={data} searchable={false} />
    </div>
  )
}

export default ReviewList
