"use client"

import { addContactMessage } from "@/actions/web/addContactMessage";
import { useToast } from '@/hooks/use-toast';
import { useForm } from "react-hook-form";

export default function ContactForm() {

  const form = useForm({
    defaultValues: {
        email: "",
        phone: "",
        name_surname: "",
        message: "",
    }
  })

  const { register, handleSubmit, formState: { errors } } = form;
  const toast = useToast();

  interface FormData {
    email: string;
    phone: string;
    name_surname: string;
    message: string;
  }

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("name_surname", data.name_surname);
    formData.append("message", data.message);

    const res = await addContactMessage(formData);

    if(res.status === 200) {
      form.reset();
      return toast.toast({
        title: 'Başarılı',
        description: res.message,
        variant: 'success',
        duration: 5000,
      })
    }else{
      return toast.toast({
        title: 'Hata',
        description: res.message,
        variant: 'destructive',
        duration: 5000,
      })
    }
  }

  return (
    <section className="wrapper bg-soft-primary">
        <div className="row">
          <div className="col-md-10 mx-auto py-5">
            <div className="newsletter-wrapper">
              <div id="mc_embed_signup2">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                 >
                  <div id="mc_embed_signup_scroll2">
                    <div className="mc-field-group input-group form-floating mb-3 flex flex-col">
                      <input
                        type="text"
                        id="name_surname"
                        autoComplete="off"
                        placeholder="İsim Soyisim"
                        className="required form-control w-100"
                        {...register("name_surname", { required: true })}
                      />
                      <label htmlFor="name_surname" className="text-start">
                        İsim Soyisim
                      </label>
                      {errors.name_surname && <span className="text-danger" style={{ fontSize:"12px" }}>Bu alan zorunludur</span>}
                    </div>
                    <div className="mc-field-group input-group form-floating mb-3 flex flex-col">
                      <input
                        type="text"
                        id="phone"
                        autoComplete="off"
                        placeholder="Telefon"
                        className="required form-control w-100"
                        {...register("phone", { required: true })}
                      />
                      <label htmlFor="phone" className="text-start">
                        Telefon
                      </label>
                        {errors.phone && <span className="text-danger" style={{ fontSize:"12px" }}>Bu alan zorunludur</span>}
                    </div>
                    <div className="mc-field-group input-group form-floating mb-3 flex flex-col">
                      <input
                        type="email"
                        id="email"
                        autoComplete="off"
                        placeholder="E-Posta Adresiniz"
                        className="required email form-control w-100"
                        {...register("email", { required: true })}
                      />
                      <label htmlFor="email" className="text-start">
                        E-Posta
                      </label>
                        {errors.email && <span className="text-danger" style={{ fontSize:"12px" }}>Bu alan zorunludur</span>}
                    </div>
                    <div className="mc-field-group input-group form-floating mb-3 flex flex-col">
                      <textarea id="message" className="form-control !min-h-[250px] w-100" {...register("message", {required: true})}></textarea>
                      <label htmlFor="message" className="text-start">
                        Mesaj
                      </label>
                        {errors.message && <span className="text-danger" style={{ fontSize:"12px" }}>Bu alan zorunludur</span>}
                    </div>
                    <div className="mc-field-group input-group">
                      <button type="submit" className="btn btn-primary w-100">
                        Gönder
                      </button>
                    </div>

                    <div id="mce-responses2" className="clear">
                      <div className="response" id="mce-error-response2" style={{ display: "none" }} />
                      <div className="response" id="mce-success-response2" style={{ display: "none" }} />
                    </div>

                    <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
                      <input type="text" name="b_ddc180777a163e0f9f66ee014_4b1bcfa0bc" tabIndex={-1} />
                    </div>

                    <div className="clear" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
