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



const SocialMediaSettings = () => {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            facebook: null,
            instagram: null,
            twitter: null,
            linkedin: null,
            youtube: null,
            pinterest: null,
            tiktok: null
        },
    });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('facebook', data.facebook);
        formData.append('instagram', data.instagram);
        formData.append('twitter', data.twitter);
        formData.append('linkedin', data.linkedin);
        formData.append('youtube', data.youtube);
        formData.append('pinterest', data.pinterest);
        formData.append('tiktok', data.tiktok);

        try {
            const response = await socialMediaSettingsEdit(formData);

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
            const response = await getSocialMediaSettings();
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
                <Label className="font-bold">Facebook</Label>
                <Input 
                    placeholder="Facebook"
                    name="facebook"
                    className="w-full"
                    {...form.register('facebook')}
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">Instagram</Label>
                <Input 
                    placeholder="Instagram"
                    name="instagram"
                    className="w-full"
                    {...form.register('instagram')}
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">Twitter</Label>
                <Input 
                    placeholder="Twitter"
                    name="twitter"
                    className="w-full"
                    {...form.register('twitter')}
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">Linkedin</Label>
                <Input 
                    placeholder="Linkedin"
                    name="linkedin"
                    className="w-full"
                    {...form.register('linkedin')}
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">Youtube</Label>
                <Input 
                    placeholder="Youtube"
                    name="youtube"
                    className="w-full"
                    {...form.register('youtube')}
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">Pinterest</Label>
                <Input 
                    placeholder="Pinterest"
                    name="pinterest"
                    className="w-full"
                    {...form.register('pinterest')}
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">TikTok</Label>
                <Input 
                    placeholder="TikTok"
                    name="tiktok"
                    className="w-full"
                    {...form.register('tiktok')}
                />
            </div>

            <div className='flex justify-end mt-5'>
                <Button variant="primary" size="lg">Kaydet</Button>
            </div>
        </form>
    );
}

export default SocialMediaSettings;