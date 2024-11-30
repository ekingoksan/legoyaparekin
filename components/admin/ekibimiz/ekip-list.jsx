'use client'
import React from 'react'
import DeleteIcon from '@/components/admin/DeleteIcon'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import dynamic from 'next/dynamic'
import SpanButton from '@/components/ui/spanButton';
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { addTeam } from '@/actions/admin/teams/add/add'
import { getTeams } from '@/actions/admin/teams/get/get'
import { editTeamMember } from '@/actions/admin/teams/edit/edit'
import { deleteTeamMember } from '@/actions/admin/teams/delete/delete'

const DataTable = dynamic(() => import('@/components/DataTable')
.then((mod) => mod.DataTable)
, { ssr: false })
 
function EkipList() {
 const router = useRouter();
 const [open, setOpen] = React.useState(false)
 const [id, setId] = React.useState(null)
 const [action, setAction] = React.useState(1)
 const [sliders, setTeams] = React.useState([])
 const [usingImage, setUsingImage] = React.useState('')
 const {toast } = useToast();

 const onSubmit = async (data) => {
  // form data
  const formData = new FormData()
  formData.append('name_surname', data.name_surname)
  formData.append('job_title', data.job_title)
  formData.append('description', data.description)
  formData.append('instagram', data.instagram)
  formData.append('twitter', data.twitter)
  formData.append('linkedin', data.linkedin)
  formData.append('image', data.image[0])

  if(action == 1) {
    const result = await addTeam(formData)

    setOpen(false)
    if(result.status == 200) {
        toast({
            title: 'Başarılı',
            description: result.message,
            variant: 'success',
            duration: 2000,
        });
    } else {
        toast({
            title: 'Hata',
            description: result.message,
            variant: 'destructive',
            duration: 2000,
        });
    }
    getSlidersData()
  } else if (action == 2) {
    const result = await editTeamMember(formData, id)
    if(result.status == 200) {
        toast({
            title: 'Başarılı',
            description: result.message,
            variant: 'success',
            duration: 2000,
        });
    } else {
        toast({
            title: 'Hata',
            description: result.message,
            variant: 'destructive',
            duration: 2000,
        });
    }
    setOpen(false)
    getSlidersData()
  }


}

const getSlidersData = async () => {
  const result = await getTeams()
  setTeams(result)
}

useEffect(() => {
  getSlidersData()
}, []);

const onDelete = async (id) => {
    const result = await deleteTeamMember(id)
    getSlidersData()
    if(result.status == 200) {
        toast({
            title: 'Başarılı',
            description: result.message,
            variant: 'success',
            duration: 2000,
        });
    } else {
        toast({
            title: 'Hata',
            description: result.message,
            variant: 'destructive',
            duration: 2000,
        });
    }
}


const onEdit = async (data,id) => {
    form.setValue('name_surname', data.name_surname)
    form.setValue('job_title', data.job_title)
    form.setValue('description', data.description)
    form.setValue('instagram', data.instagram)
    form.setValue('twitter', data.twitter)
    form.setValue('linkedin', data.linkedin)
   
    setUsingImage(`/images/site/${data.image}`)
    setAction(2)
    setId(id)
    setOpen(true)
}


const form = useForm({
  defaultValues: {
        name_surname: '',
        job_title: '',
        description: '',
        instagram: '',
        twitter: '',
        linkedin: '',
        image: ''
   
  },
})

 const columns = [
    {
        id: "name_surname",
        header: () => <div>
            İsim Soyisim
        </div>,
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
        id: "job_title",
        header: () => <div>Mesleği</div>,
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
        id: "description",
        header: () => <div>Hakkında</div>,
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
        id: "instagram",
        header: () => <div>İnstagram</div>,
        cell: ({ row }) => {
            const data = row.original
           
            return (
                <div className="flex items-center">
                    <span className="ml-2 font-semibold">{data.instagram}</span>
                </div>
            )
        }
    },
    {
        id: "twitter",
        header: () => <div>Twitter</div>,
        cell: ({ row }) => {
            const data = row.original
           
            return (
                <div className="flex items-center">
                    <span className="ml-2 font-semibold">{data.twitter}</span>
                </div>
            )
        }
    },
    {
        id: "linkedin",
        header: () => <div>Linkedin</div>,
        cell: ({ row }) => {
            const data = row.original
           
            return (
                <div className="flex items-center">
                    <span className="ml-2 font-semibold">{data.linkedin}</span>
                </div>
            )
        }
    },
    {
        id: "image",
        header: () => <div>Resim</div>,
        cell: ({ row }) => {
            const data = row.original
            return (
                <div className="flex items-center">
                    <span className="ml-2 font-semibold">
                        <img src={`/images/site/${data.image}`} alt="Resim" className="w-20 h-20 object-fit" />
                    </span>
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
                    <i onClick={() => onEdit(data, data.id)} className="bi bi-pencil-square text-blue-500 cursor-pointer"></i>
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
       <div className='flex justify-end mb-5'>
            <Sheet className="p-0" open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button onClick={() => {
                        form.reset()
                        setAction(1)
                    }}>
                        Ekip Üyesi
                    </Button>
                </SheetTrigger>
                <SheetContent side="bottom" close={false} className="h-[100vh] p-0 overflow-y-auto bg-gray-100">
                    <SheetHeader className="border-b p-0 bg-gray-800 text-white px-6 py-3 flex flex-row justify-between items-center space-y-0">
                        <SheetTitle className="text-white">
                            {action == 1 ? 'Ekip Üyesi Ekle' : 'Ekip Üyesi Düzenle'}
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
                                {action == 1 ? 'Ekip Üyesi Ekle' : 'Ekip Üyesi Düzenle'}
                            </SheetDescription>
                            <SheetDescription className="text-sm text-gray-500">
                                Ekip üyesi {
                                    action == 1 ? 'eklemek' : 'düzenlemek'
                                } için formu doldurunuz.
                            </SheetDescription>
                        </div>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className='flex flex-col gap-1 mb-5'>
                                <Label>Ad Soyad</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    {...form.register('name_surname')}
                                    placeholder="Ad Soyad"
                                    className="w-full"
                                />
                            </div>
                            <div className='flex flex-col gap-1 mb-5'>
                                <Label>Meslek</Label>
                                <Input
                                    type="text"
                                    name="job_title"
                                    {...form.register('job_title')}
                                    placeholder="Meslek"
                                    className="w-full"
                                />
                            </div>
                            <div className='flex flex-col gap-1 mb-5'>
                                <Label>Hakkında</Label>
                                <Input
                                    type="text"
                                    name="description"
                                    {...form.register('description')}
                                    placeholder="Hakkında"
                                    className="w-full"
                                />
                            </div>

                            <div className='flex flex-col gap-1 mb-5'>
                                <Label>İnstagram</Label>
                                <Input
                                    type="text"
                                    name="instagram"
                                    {...form.register('instagram')}
                                    placeholder="İnstagram"
                                    className="w-full"
                                />
                            </div>

                            <div className='flex flex-col gap-1 mb-5'>
                                <Label>Twitter</Label>
                                <Input
                                    type="text"
                                    name="twitter"
                                    {...form.register('twitter')}
                                    placeholder="Twitter"
                                    className="w-full"
                                />
                            </div>

                            <div className='flex flex-col gap-1 mb-5'>
                                <Label>Linkedin</Label>
                                <Input
                                    type="text"
                                    name="linkedin"
                                    {...form.register('linkedin')}
                                    placeholder="Linkedin"
                                    className="w-full"
                                />
                            </div>

                            <div className='flex flex-col gap-1 mb-5'>
                                <Label>Resim</Label>
                                {
                                    usingImage && (
                                        <div className="relative inline-block w-48 border p-3">
                                            <img src={usingImage} alt="Kategori Resmi" className="w-full object-contain my-3" />
                                           
                                        </div>
                                    )
                                }
                                <Input
                                    type="file"
                                    name="image"
                                    {...form.register('image')}
                                    placeholder="Resim"
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
        </div>
      <DataTable columns={columns} data={sliders} searchable={false} filteredColumns={false} />
    </div>
  )
}

export default EkipList