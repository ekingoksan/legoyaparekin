"use client"
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { siteSettingsEdit } from '@/actions/admin/settings/edit/siteSettingsEdit';
import { getSiteSettings } from '@/actions/admin/settings/get/getSiteSettings';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';
import { SunEditorComponent } from '@/components/ui/suneditor';



const SiteSettings = () => {

    const [logo , setLogo] = React.useState(null);
    const [favicon , setFavicon] = React.useState(null);
    const [usingLogo , setUsingLogo] = React.useState(null);
    const [usingFavicon , setUsingFavicon] = React.useState(null);
    const router = useRouter();

    const { toast } = useToast();
    const form = useForm({
        defaultValues: {
            logo: null,
            favicon: null,
            address: null,
            phone: null,
            email: null,
            google_map: null,
            whatsapp: null,
            whatsapp_live: null,
            maintenance_mode: null,
            maintenance_text: null
        },
    });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('logo', logo);
        formData.append('favicon', favicon);
        formData.append('address', data.address);
        formData.append('phone', data.phone);
        formData.append('email', data.email);
        formData.append('google_map', data.google_map);
        formData.append('whatsapp', data.whatsapp);
        formData.append('whatsapp_live', data.whatsapp_live);
        formData.append('maintenance_mode', data.maintenance_mode);
        formData.append('maintenance_text', data.maintenance_text);

        try {
            const response = await siteSettingsEdit(formData);

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

    const fetchSiteSettings = async () => {
        const response = await getSiteSettings();
        form.setValue('address', response?.address);
        form.setValue('phone', response?.phone);
        form.setValue('email', response?.email);
        form.setValue('google_map', response?.google_map);
        form.setValue('whatsapp', response?.whatsapp);
        form.setValue('whatsapp_live', response?.whatsapp_live);
        form.setValue('maintenance_mode', response?.maintenance_mode);
        form.setValue('maintenance_text', response?.maintenance_text);
        setUsingLogo(`/images/site/${response?.logo}`)
        setUsingFavicon(`/images/site/${response?.favicon}`)
    }

    const changeLogo = async (e) => {
        setLogo(e.currentTarget.files[0])
        setUsingLogo(URL.createObjectURL(e.currentTarget.files[0]))
    }

    const changeFavicon = async (e) => {
        setFavicon(e.currentTarget.files[0])
        setUsingFavicon(URL.createObjectURL(e.currentTarget.files[0]))
    }

    React.useEffect(() => {
        fetchSiteSettings();
    }, []);

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2 py-3" id='logoDiv'>
                <Label className="font-bold">Site Üst Logosu</Label>
                {
                    usingLogo && (
                        <img src={usingLogo} alt="Site Üst Logosu" className="w-48 object-contain my-3" />
                    )
                }
                <Input 
                    onChange={(e) => changeLogo(e)}
                    placeholder="Site Üst Logosu"
                    name="logo"
                    className="w-full"
                    type="file"
                    accept="image/*"
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">Site Favicon</Label>
                {
                    usingFavicon && (
                        <img src={usingFavicon} alt="Site Favicon" className="w-12 object-contain my-3" />
                    )
                }
                <Input 
                    onChange={(e) => changeFavicon(e)}
                    placeholder="Favicon"
                    name="favicon"
                    className="w-full"
                    type="file"
                    accept="image/*"
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">Adres</Label>
                <Textarea 
                    placeholder="Adres"
                    name="address"
                    className="w-full"
                    {...form.register('address')}
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">Telefon</Label>
                <Input 
                    placeholder="Telefon"
                    name="phone"
                    className="w-full"
                    {...form.register('phone')}
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">E-Posta</Label>
                <Input 
                    placeholder="E-Posta"
                    name="email"
                    className="w-full"
                    {...form.register('email')}
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">Google Map</Label>
                <Textarea 
                    placeholder="Google Map"
                    name="google_map"
                    className="w-full h-[200px]"
                    {...form.register('google_map')}
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">Whatsapp Numarası</Label>
                <Input 
                    placeholder="Whatsapp Numarası"
                    name="whatsapp"
                    className="w-full"
                    {...form.register('whatsapp')}
                />
            </div>
            <div className="flex flex-row items-center gap-2 py-3">
                <Label className="font-bold">Whatsapp Canlı Destek</Label>
                <Switch 
                    name="whatsapp_live"
                    checked={form.watch('whatsapp_live')}
                    onCheckedChange={(e) => form.setValue('whatsapp_live', e)}
                />
            </div>
            <div className="flex flex-row items-center gap-2 py-3">
                <Label className="font-bold">Bakım Modu</Label>
                <Switch 
                    name="maintenance_mode"
                    checked={form.watch('maintenance_mode')}
                    onCheckedChange={(e) => form.setValue('maintenance_mode', e)}
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">Bakım Modu Mesajı</Label>
                <SunEditorComponent 
                    placeholder="Bakım Modu Mesajı"
                    value={form.watch('maintenance_text')}
                    setValue={(e) => form.setValue('maintenance_text', e)}
                />
            </div>

            <div className='flex justify-end mt-5'>
                <Button variant="primary" size="lg">Kaydet</Button>
            </div>
        </form>
    );
}

export default SiteSettings;