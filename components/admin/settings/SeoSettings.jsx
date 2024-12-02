"use client"
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';
import { seoSettingsEdit } from '@/actions/admin/settings/edit/seoSettingsEdit';
import { getSeoSettings } from '@/actions/admin/settings/get/getSeoSettings';



const SeoSettings = () => {
    const router = useRouter();

    const { toast } = useToast();
    const form = useForm({
        defaultValues: {
            site_title: null,
            description: null,
            keywords: null,
            page_title: null
        },
    });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('site_title', data.site_title);
        formData.append('description', data.description);
        formData.append('keywords', data.keywords);
        formData.append('page_title', data.page_title);

        try {
            const response = await seoSettingsEdit(formData);

            if (response.status !== 200) {
                // sayfa logoDiv'e gitsin
                document.getElementById('navbar').scrollIntoView();

                return toast({
                    title: 'Hata',
                    description: response.message,
                    variant: 'destructive',
                    duration: 2000,
                });
            }else{
                // sayfa en üste çıksın
                document.getElementById('navbar').scrollIntoView();
                router.refresh();
                return toast({
                    title: 'Başarılı',
                    description: response.message,
                    variant: 'success',
                    duration: 2000
                });
            }

        } catch (error) {
            console.log("SITE_SETTINGS_ERROR", error);
            toast({
                title: 'Hata',
                description: 'Bir hata oluştu. Lütfen tekrar deneyin.',
                variant: 'error',
                duration: 2000
            });
        }
    }

    const fetchSeoSettings = async () => {
        const response = await getSeoSettings();
        form.setValue('site_title', response.site_title);
        form.setValue('description', response.description);
        form.setValue('keywords', response.keywords);
        form.setValue('page_title', response.page_title);
    }

    React.useEffect(() => {
        fetchSeoSettings();
    }, []);

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">Site Başlığı</Label>
                <Input 
                    placeholder="Site Başlığı"
                    name="site_title"
                    className="w-full"
                    {...form.register('site_title')}
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">Anahtar Kelimeler</Label>
                <Input 
                    placeholder="Anahtar Kelimeler"
                    name="keywords"
                    className="w-full"
                    {...form.register('keywords')}
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">SEO Açıklaması</Label>
                <Textarea 
                    placeholder="SEO Açıklaması"
                    name="description"
                    className="w-full"
                    {...form.register('description')}
                />
            </div>

            <div className='flex justify-end mt-5'>
                <Button variant="primary" size="lg">Kaydet</Button>
            </div>
        </form>
    );
}

export default SeoSettings;