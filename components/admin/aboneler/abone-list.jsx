"use client";
import React, { useState } from 'react'
import DeleteIcon from '../DeleteIcon'
import { useToast } from '@/hooks/use-toast';
import dynamic from 'next/dynamic'
import { getSubscriptions } from '@/actions/admin/aboneler/get/getAboneler';
import { deleteSubscribers } from '@/actions/admin/aboneler/get/delete/deleteSubscription';




const DataTable = dynamic(() => import('@/components/DataTable')
.then((mod) => mod.DataTable)
, { ssr: false })

const AbonelerList = () => {
    const [data, setData] = useState([])


    const {toast} = useToast();

    const fetchData = async () => {
        const res = await getSubscriptions()
        setData(res)
    }

    const onDelete = async (id) => {
        const res = await deleteSubscribers(id)
        
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


    const columns = [
        {
            id: "email",
            header: () => <div>E-Posta</div>,
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
            id: "actions",
            header: () => <div>İşlemler</div>,
            cell: ({ row }) => {
                "use client"
                const data = row.original
    
                return (
                    <div className='flex gap-3'>
                        <div>
                            <DeleteIcon handleDelete={() => onDelete(data.id)} />
                        </div>
                    </div>
                )
            },
        },
    ]

  return (
    <div>
        <DataTable columns={columns} data={data} searchable={false} filteredColumns={false} />
    </div>
  )
}

export default AbonelerList
