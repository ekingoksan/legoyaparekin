"use client";
import React, { useEffect, useRef, useState } from 'react'
import DeleteIcon from '../DeleteIcon'
import { useToast } from '@/hooks/use-toast';
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
import { getPortfolioList } from '@/actions/admin/portfolio/get/getPortfolioList';
import { deletePortfolio } from '@/actions/admin/portfolio/delete/deletePortfolio';
import { addPortfolio } from '@/actions/admin/portfolio/add/addPortfolio';
import { editPortfolio } from '@/actions/admin/portfolio/edit/editPortfolio';
import { deletePortfolioImage } from '@/actions/admin/portfolio/delete/deletePortfolioImage';
import { useRouter } from 'next/navigation';

const DataTable = dynamic(() => import('@/components/DataTable')
    .then((mod) => mod.DataTable), { ssr: false });

const PortfolioList = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [usingImages, setUsingImages] = useState([]);
    const [editData, setEditData] = useState(null);
    const [action, setAction] = useState(1);
    const inputRef = useRef(null); // Input referansı oluşturuyoruz
    const { toast } = useToast();
    const router = useRouter();

    const fetchData = async () => {
        const res = await getPortfolioList();
        setData(res);
    };

    const onDelete = async (id) => {
        const res = await deletePortfolio(id);
        if (res.status === 200) {
            await fetchData();
            return toast({
                title: 'Başarılı',
                description: res.message,
                variant: 'success',
                duration: 2000,
            });
        } else {
            return toast({
                title: 'Hata',
                description: res.message,
                variant: 'destructive',
                duration: 2000,
            });
        }
    };

    const onSubmit = async (data) => {
        const formdata = new FormData();
        formdata.append('title', data.title);
        formdata.append('description', data.description);

        images.forEach((image) => {
            formdata.append('images', image);
        });

        let res;
        if (action === 1) {
            res = await addPortfolio(formdata);
        } else {
            formdata.append('id', editData.id);
            res = await editPortfolio(formdata);
        }

        if (res.status === 200) {
            await fetchData();
            setOpen(false);
            form.reset();
            setUsingImages([]);
            setImages([]);
            router.refresh();
            return toast({
                title: 'Başarılı',
                description: res.message,
                variant: 'success',
                duration: 2000,
            });
        } else {
            return toast({
                title: 'Hata',
                description: res.message,
                variant: 'destructive',
                duration: 2000,
            });
        }
    };

    const changeImages = (e) => {
        const files = Array.from(e.currentTarget.files);
        const updatedImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setUsingImages([...usingImages, ...updatedImages]);
        setImages(files);
    };

    const onDeleteImage = async (index) => {
        const imageToDelete = usingImages[index];  // Silinecek resim
        const imageName = imageToDelete.name; // Resmin adı
        const newImages = usingImages.filter((image, i) => i !== index); // Resimleri güncelle

        setUsingImages(newImages); // Resimleri güncelle

            // Input alanındaki seçili resimler listesinden de sil
        const updatedImages = images.filter((image) => image.name !== imageName);
        setImages(updatedImages);

        if(action == 2){
            const res = await deletePortfolioImage(imageName)
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
    };

    const form = useForm({
        defaultValues: {
            title: '',
            description: '',
        },
    });

    const onEdit = (data) => {
        setEditData(data);
        setAction(2);
        setOpen(true);
        console.log(data);
        form.setValue('title', data.title);
        form.setValue('description', data.description);
        setUsingImages(data.images.map((img) => ({ preview: `/images/portfolio/${img.image}` , name: img.image })));
    };

    const columns = [
        {
            id: "portfolio_name",
            header: () => <div>Başlık</div>,
            cell: ({ row }) => {
                const data = row.original;
                return (
                    <div className="flex items-center">
                        <span className="ml-2 font-semibold">{data.title}</span>
                    </div>
                );
            },
        },
        {
            id: "actions",
            header: () => <div>İşlemler</div>,
            cell: ({ row }) => {
                const data = row.original;
                return (
                    <div className='flex gap-3'>
                        <i onClick={() => onEdit(data)} className="bi bi-pencil-square text-blue-500 cursor-pointer"></i>
                        <div>
                            <DeleteIcon handleDelete={() => onDelete(data.id)} />
                        </div>
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        fetchData();
        setAction(1);
    }, []);

    return (
        <div>
            <div className='flex justify-end mb-5'>
                <Sheet className="p-0" open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button onClick={() => {
                            setAction(1);
                            setUsingImages([]);
                            setImages([]);
                            form.reset();
                        }}>Yeni İş Ekle</Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" close={false} className="h-[100vh] p-0 overflow-y-auto bg-gray-100">
                        <SheetHeader className="border-b p-0 bg-gray-800 text-white px-6 py-3 flex flex-row justify-between items-center space-y-0">
                            <SheetTitle className="text-white">
                                {action === 1 ? 'Yeni İş Ekle' : 'İş Düzenle'}
                            </SheetTitle>
                            <SheetClose className="text-white">
                                <SpanButton className="bg-transparent border border-gray-400 py-1 px-3 text-xs" size="sm">
                                    <i className="bi bi-x text-xl"></i>
                                </SpanButton>
                            </SheetClose>
                        </SheetHeader>
                        <div className='mt-5 mx-6 bg-white p-6 rounded-md'>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className='flex flex-col gap-1 mb-5'>
                                    <Label>Başlık</Label>
                                    <Input
                                        type="text"
                                        {...form.register('title')}
                                        placeholder="Başlık"
                                        className="w-full"
                                    />
                                </div>
                                <div className="grid gap-2 py-3">
                                    <Label className="font-bold">Görseller</Label>
                                    <div className="flex flex-wrap gap-3">
                                        {usingImages.map((image, index) => (
                                            <div key={index} className="relative inline-block w-48 border p-3">
                                                <img src={image.preview} alt={`Resim ${index}`} className="w-full object-contain my-3" />
                                                <span
                                                    className="absolute top-[-5px] right-[-5px] bg-red-500 text-white rounded-full p-1 cursor-pointer hover:bg-red-600 transition w-5 h-5 flex items-center justify-center"
                                                    onClick={() => onDeleteImage(index)}
                                                >
                                                    <i className="bi bi-x text-xs"></i>
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <Input
                                        onChange={changeImages}
                                        placeholder="Görseller"
                                        name="images[]"
                                        className="w-full"
                                        type="file"
                                        accept="image/*"
                                        ref={inputRef}
                                        multiple
                                    />
                                </div>
                                <div className="grid gap-2 py-3">
                                    <Label className="font-bold">Açıklama</Label>
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
    );
};

export default PortfolioList;
