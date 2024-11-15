"use client";
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { getEmailSettings } from '@/actions/admin/settings/get/getEmailSettings';
import { Switch } from '@/components/ui/switch';
import { mailSettingsEdit } from '@/actions/admin/settings/edit/mailSettingsEdit';



const EmailSettings = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [isUsing, setIsUsing] = React.useState(null);

    const form = useForm({
        defaultValues: {
            host: null,
            port: null,
            secure: null,
            user: null,
            pass: null,
            is_using: null
        },
    });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('host', data.host);
        formData.append('port', data.port);
        formData.append('secure', data.secure);
        formData.append('user', data.user);
        formData.append('pass', data.pass);
        formData.append('is_using', data.is_using);

        try {
            const response = await mailSettingsEdit(formData);

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
            console.log("EMAIL_SETTINGS_ERROR", error);
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
            const response = await getEmailSettings();
            form.reset(response);
        } catch (error) {
            console.log("FETCH_EMAIL_SETTINGS_ERROR", error);
        }
    }

    useEffect(() => {
        fetchSettings();
    }, []);
    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">Kendi Mail Sunucumu Kullan <span className='font-normal'>(* Bu seçenek işaretlenirse kendinize ait mail sunucusu kullanılacaktır. Maillerin gidebilmesi için lütfen doğru bilgileri giriniz. Seçenek kapatılırsa Proxima Bilişim sunucularından mail iletimi devam edecektir.)</span></Label>
                <Switch 
                    name="is_using"
                    checked={form.watch('is_using')}
                    onCheckedChange={(e) => form.setValue('is_using', e)}
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">Host</Label>
                <Input 
                    placeholder="Host"
                    name="host"
                    className="w-full"
                    {...form.register('host')}
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">Port</Label>
                <Input 
                    type="number"
                    placeholder="Port"
                    name="port"
                    className="w-full"
                    {...form.register('port')}
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">Secure <span className='font-normal'>(* TRUE ise 1 FALSE ise 0 yazın.)</span></Label>
                <Input 
                    type="number"
                    placeholder="Secure"
                    name="secure"
                    className="w-full"
                    {...form.register('secure')}
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">E-Posta Adresi</Label>
                <Input 
                    placeholder="E-Posta Adresi"
                    name="user"
                    className="w-full"
                    {...form.register('user')}
                />
            </div>
            <div className="grid gap-2 py-3">
                <Label className="font-bold">Şifre</Label>
                <Input 
                    placeholder="Şifre"
                    name="pass"
                    className="w-full"
                    {...form.register('pass')}
                />
            </div>
            <div className='flex justify-end mt-5'>
                <Button variant="primary" size="lg">Kaydet</Button>
            </div>
        </form>
    );
}

export default EmailSettings;