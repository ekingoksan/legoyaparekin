"use client"
import { useForm } from 'react-hook-form';
import axios from "axios"
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

export default function Login() {

    const router = useRouter();

    const form = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const handleSubmit = async (data) => {
        try {
            const email = data.email
            const password = data.password
            const formData = new FormData();

            formData.append("email", email);
            formData.append("password", password);

            const response = await axios.post("/api/login", formData);

            if (response.data.status === 200) {
                // sayfa yenilenerek /admin sayfasına yönlendirme yapılıyor
                document.location.href = "/admin";
            }else{
                toast.error(response.data.Message);
            }
        } catch (error) {
            console.log("ERROR => ", error);
            toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
    }

    return (
        <div className="flex flex-1 min-h-[100vh] w-[100%] justify-center items-center px-3">
            <div className="w-full border border-gray-300 md:w-2/3 lg:w-1/3 p-5 flex flex-col justify-center items-center">
                <h1 className="text-xl font-bold">Proxima E-Ticaret</h1>
                <form className="w-full mt-5" onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-Posta</label>
                        <input 
                            {...form.register("email")}
                            type="text" 
                            id="email" 
                            name="email" 
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Şifre</label>
                        <input 
                            {...form.register("password")}
                            type="password" 
                            id="password" 
                            name="password" 
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
                        />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md">Giriş</button>
                    </div>
                </form>
            </div>
        </div>
    )
}