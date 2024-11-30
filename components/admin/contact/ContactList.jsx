"use client";
import React, { useEffect, useState } from 'react'
import DeleteIcon from '../DeleteIcon'
import { deleteBlog } from '@/actions/admin/blog/delete/deleteBlog';
import { useToast } from '@/hooks/use-toast';
import dynamic from 'next/dynamic'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/Modal';
import { getContactMessage } from '@/actions/admin/contact/get/getContactMessage';
import { ReadMessage } from '@/actions/admin/contact/ReadMessage';
import { deleteMessage } from '@/actions/admin/contact/delete/deleteMessage';
import { Textarea } from '@/components/ui/textarea';




const DataTable = dynamic(() => import('@/components/DataTable')
.then((mod) => mod.DataTable)
, { ssr: false })

const ContactList = () => {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null)


    const {toast} = useToast();

    const fetchData = async () => {
        const res = await getContactMessage()
        setData(res)
    }

    const onDelete = async (id) => {
        const res = await deleteMessage(id)
        
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


    const messageRead = async (data) => {
        setMessage(data)
        setOpen(true)
        if(data.is_read === 0){
            await ReadMessage(data.id)
            await fetchData()
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
            id: "phone",
            header: () => <div>Telefon</div>,
            cell: ({ row }) => {
                const data = row.original
               
                return (
                    <div className="flex items-center">
                        <span className="ml-2 font-semibold">{data.phone}</span>
                    </div>
                )
            }
        },
        {
            id: "email",
            header: () => <div>E-Mail</div>,
            cell: ({ row }) => {
                const data = row.original
               
                return (
                    <div className="flex items-center">
                        <span className="ml-2 font-semibold">{data.email}</span>
                    </div>
                )
            }
        },
        {
            id: "is_read",
            header: () => <div>Durum</div>,
            cell: ({ row }) => {
                const data = row.original
               
                return (
                    <div className="flex items-center">
                        {
                            data.is_read === 0 ? <Label className="bg-red-500 w-full text-center text-white py-2 rounded">Okunmadı</Label> : <Label className="bg-green-500 w-full text-center py-2 text-white rounded">Okundu</Label>
                        }
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
                    <div className='flex gap-3 items-center'>
                        <Label onClick={() => messageRead(data)} className="flex gap-2 bg-blue-500 py-2 rounded px-2 text-white">
                            <i className="bi bi-eye-fill text-white cursor-pointer"></i>
                            Mesajı Oku
                        </Label>
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
    }, [])

  return (
    <div>
        <Modal open={open} setOpen={setOpen} title="Blog Ekle">
            <div className="p-4 flex gap-3 flex-col h-[calc(100vh-400px)] overflow-y-auto">
                <div className="flex gap-4 items-center">
                    <Label className="w-[150px]">İsim Soyisim</Label>
                    <Label className="border border-gray rounded w-full px-2 py-3">{message?.name_surname}</Label>
                </div>
                <div className="flex gap-4 items-center">
                    <Label className="w-[150px]">Telefon</Label>
                    <Label className="border border-gray rounded w-full px-2 py-3">{message?.phone}</Label>
                </div>
                <div className="flex gap-4 items-center">
                    <Label className="w-[150px]">E-Mail</Label>
                    <Label className="border border-gray rounded w-full px-2 py-3">{message?.email}</Label>
                </div>
                <div className="flex gap-4 items-center">
                    <Label className="w-[150px]">Mesaj</Label>
                    <Label className="border border-gray rounded w-full px-2 py-3">{message?.message}</Label>
                </div>
            </div>
        </Modal>
        <DataTable columns={columns} data={data} searchable={false} filteredColumns={false} />
    </div>
  )
}

export default ContactList
