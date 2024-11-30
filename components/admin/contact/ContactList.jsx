"use client";
import React, { useEffect, useRef, useState } from 'react'
import DeleteIcon from '../DeleteIcon'
import { deleteBlog } from '@/actions/admin/blog/delete/deleteBlog';
import { useToast } from '@/hooks/use-toast';
import { getBlogList } from '@/actions/admin/blog/get/getBlogList';
import dynamic from 'next/dynamic'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import SpanButton from '@/components/ui/spanButton';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form'
import { SunEditorComponent } from '@/components/ui/suneditor';
import { addBlog } from '@/actions/admin/blog/add/addBlog';
import { editBlog } from '@/actions/admin/blog/edit/editBlog';




const DataTable = dynamic(() => import('@/components/DataTable')
.then((mod) => mod.DataTable)
, { ssr: false })

const ContactList = () => {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [usingImage, setUsingImage] = useState(null);
    const inputRef = useRef(null); // Input referansı oluşturuyoruz
    const [editData, setEditData] = useState(null);
    const [action, setAction] = useState(1);


    const {toast} = useToast();

    const fetchData = async () => {
        const res = await getBlogList()
        setData(res)
    }

    const onDelete = async (id) => {
        const res = await deleteBlog(id)
        
        if(res.status === 200){
            await fetchData()
            return toast({
                title: 'Başarılı',
                description: res.message,
                variant: 'destructive',
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

    const onSubmit = async (data) => {
        const formdata = new FormData();
        formdata.append('title', data.title)
        formdata.append('description', data.description)
        formdata.append('image', image)
        let res;
        if(action === 1){
            res = await addBlog(formdata)
        }else{
            formdata.append('id', editData.id)
            res = await editBlog(formdata)
        }

        if(res.status === 200){
            await fetchData()
            setOpen(false)
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

    const changeImage = async (e) => {
        setUsingImage(URL.createObjectURL(e.currentTarget.files[0]))
        setImage(e.currentTarget.files[0])
    }

    const onDeleteImage = () => {
        setUsingImage(null)
        // input value sıfırlanmalı
        if (inputRef.current) {
            inputRef.current.value = ''; // Inputun değerini temizliyoruz
        }
    }

    const form = useForm({
        defaultValues: {
            title: '',
            description: ''
        }
    })

    const onEdit = (data) => {
        setEditData(data)
        setAction(2)
        setOpen(true)
        form.setValue('title', data.title)
        form.setValue('description', data.description)
        setUsingImage(`/images/blog/${data.image}`)
    }

    const columns = [
        {
            id: "blog_name",
            header: () => <div>Blog Başlığı</div>,
            cell: ({ row }) => {
                const data = row.original
               
                return (
                    <div className="flex items-center">
                        <span className="ml-2 font-semibold">{data.title}</span>
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

    useEffect(() => {
        fetchData()
        setAction(1)
    }, [])

  return (
    <div>
        <div className='flex justify-end mb-5'>
            <Sheet className="p-0" open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button>Yeni Blog Ekle</Button>
                </SheetTrigger>
                <SheetContent side="bottom" close={false} className="h-[100vh] p-0 overflow-y-auto bg-gray-100">
                    <SheetHeader className="border-b p-0 bg-gray-800 text-white px-6 py-3 flex flex-row justify-between items-center space-y-0">
                        <SheetTitle className="text-white">
                            {action === 1 ? 'Yeni Blog Ekle' : 'Blog Düzenle'}
                        </SheetTitle>
                        <SheetClose className="text-white">
                            <SpanButton className="bg-transparent border border-gray-400 py-1 px-3 text-xs" size="sm">
                                <i className="bi bi-x text-xl"></i>
                            </SpanButton>
                        </SheetClose>
                    </SheetHeader>
                    <div className='mt-5 mx-6 bg-white p-6 rounded-md'>
                        <div className='mb-5'>
                            <SheetDescription className="text-xl font-semibold">
                                {action === 1 ? 'Yeni Blog Ekle' : 'Blog Düzenle'}
                            </SheetDescription>
                            <SheetDescription className="text-sm text-gray-500">
                            </SheetDescription>
                        </div>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className='flex flex-col gap-1 mb-5'>
                                <Label>Blog Başlığı</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    {...form.register('title')}
                                    placeholder="Blog Başlığı"
                                    className="w-full"
                                />
                            </div>
                            <div className="grid gap-2 py-3" id='logoDiv'>
                                <Label className="font-bold">Görsel</Label>
                                {
                                    usingImage && (
                                        <div className="relative inline-block w-48 border p-3">
                                            <img src={usingImage} alt="Kategori Resmi" className="w-full object-contain my-3" />
                                            <span
                                                className="absolute top-[-5px] right-[-5px] bg-red-500 text-white rounded-full p-1 cursor-pointer hover:bg-red-600 transition w-5 h-5 flex items-center justify-center"
                                                onClick={() => onDeleteImage()}
                                            >
                                                <i className="bi bi-x text-xs"></i>
                                            </span>
                                        </div>
                                    )
                                }
                                <Input
                                    onChange={(e) => changeImage(e)}
                                    placeholder="Site Üst Logosu"
                                    name="logo"
                                    className="w-full"
                                    type="file"
                                    accept="image/*"
                                    ref={inputRef}
                                />
                            </div>
                            <div className="grid gap-2 py-3">
                                <Label className="font-bold">Blog Metni</Label>
                                <SunEditorComponent 
                                    placeholder="Blog Metni"
                                    value={form.watch('description')}
                                    setValue={(e) => form.setValue('description', e)}
                                />
                            </div>
                            <div className='flex justify-end mt-5'>
                                <Button variant="primary" size="lg">Kaydet</Button>
                            </div>
                        </form>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
        <DataTable columns={columns} data={data} searchable={false} filteredColumns={false} />
    </div>
  )
}

export default ContactList
