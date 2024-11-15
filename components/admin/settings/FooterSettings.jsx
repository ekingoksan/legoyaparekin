"use client"
import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { footerSettingsEdit } from '@/actions/admin/settings/edit/footerSettingsEdit';
import { getFooterSettings } from '@/actions/admin/settings/get/getFooterSettings';



const FooterSettings = () => {

    const [logo , setLogo] = React.useState(null);
    const [usingLogo , setUsingLogo] = React.useState(null);
    const router = useRouter();

    const { toast } = useToast();
    const form = useForm({
        defaultValues: {
            logo: null,
            footer_text: null
        },
    });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('logo', logo);
        formData.append('footer_text', data.footer_text);

        try {
            const response = await footerSettingsEdit(formData);

            if (response.status !== 200) {
                document.getElementById('navbar').scrollIntoView();

                return toast({
                    title: 'Hata',
                    description: response.message,
                    variant: 'destructive',
                    duration: 2000,
                });
            }else{
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
            console.log("FOOTER_SETTINGS_ERROR", error);
            toast({
                title: 'Hata',
                description: 'Bir hata oluştu. Lütfen tekrar deneyin.',
                variant: 'error',
                duration: 2000
            });
        }
    }

    const fetchFooterSettings = async () => {
        const response = await getFooterSettings();
        form.setValue('footer_text', response.footer_text);
        setUsingLogo(`/images/site/${response.logo}`)
    }

    const changeLogo = async (e) => {
        setLogo(e.currentTarget.files[0])
        setUsingLogo(URL.createObjectURL(e.currentTarget.files[0]))
    }

    useEffect(() => {
        fetchFooterSettings();
    }, []);

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2 py-3" id='logoDiv'>
                <Label className="font-bold">Site Alt Logosu</Label>
                {
                    usingLogo && (
                        <img src={usingLogo} alt="Site Üst Logosu" className="w-48 object-contain my-3" />
                    )
                }
                <Input 
                    onChange={(e) => changeLogo(e)}
                    placeholder="Site Alt Logosu"
                    name="logo"
                    className="w-full"
                    type="file"
                    accept="image/*"
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">Footer Yazısı</Label>
                <Textarea 
                    placeholder="Footer Yazısı"
                    name="footer_text"
                    className="w-full"
                    {...form.register('footer_text')}
                />
            </div>

            <div className='flex justify-end mt-5'>
                <Button variant="primary" size="lg">Kaydet</Button>
            </div>
        </form>
    );
}

export default FooterSettings;