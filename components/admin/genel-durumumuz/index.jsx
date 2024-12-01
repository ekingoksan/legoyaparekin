"use client";
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { getSocialMediaSettings } from '@/actions/admin/settings/get/getSocialMediaSettings';
import React, { useEffect } from 'react';
import { socialMediaSettingsEdit } from '@/actions/admin/settings/edit/socialMediaSettingsEdit';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { genel_durum_add_or_update } from '@/actions/admin/genel-durumumuz/add-or-update';
import { getGenelDurumumuz } from '@/actions/admin/genel-durumumuz/get-genel-durum';



const GenelDurumForm = () => {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            completed_projects: null,
            satisfied_customers: null,
            years_of_experience: null,
            customer_retention: null,
            updated_at: null,
        },
    });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('completed_projects', data.completed_projects);
        formData.append('satisfied_customers', data.satisfied_customers);
        formData.append('years_of_experience', data.years_of_experience);
        formData.append('customer_retention', data.customer_retention);

        try {
            const response = await genel_durum_add_or_update(formData);

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
            console.log("SOCIAL_MEDIA_SETTINGS_ERROR", error);
            toast({
                title: 'Hata',
                description: 'Bir hata oluştu. Lütfen tekrar deneyin.',
                variant: 'destructive',
                duration: 2000
            });
        }
    }

    const fetchSettings = async () => {
        try {
            const response = await getGenelDurumumuz();
            form.reset(response);
        } catch (error) {
            console.log("FETCH_SOCIAL_MEDIA_SETTINGS_ERROR", error);
        }
    }

    useEffect(() => {
        fetchSettings();
    }, []);
    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">Tamamlanan Projeler</Label>
                <Input 
                    placeholder="Tamamlanan Projeler"
                    type="number"
                    name="completed_projects"
                    className="w-full"
                    {...form.register('completed_projects')}
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">Memnun Müşteriler</Label>
                <Input 
                    placeholder="Memnun Müşteriler"
                         type="number"
                    name="satisfied_customers"
                    className="w-full"
                    {...form.register('satisfied_customers')}
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">
                    Deneyim 
                </Label>
                <Input 
                    placeholder="Deneyim"
                    name="years_of_experience"
                         type="number"
                    className="w-full"
                    {...form.register('years_of_experience')}
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">Çalışan Sayısı</Label>
                <Input 
                    placeholder="Çalışan Sayısı"
                         type="number"
                    name="Çalışan Sayısı"
                    className="w-full"
                    {...form.register('customer_retention')}
                />
            </div>

            <div className='flex justify-end mt-5'>
                <Button variant="primary" size="lg">Kaydet</Button>
            </div>
        </form>
    );
}

export default GenelDurumForm;