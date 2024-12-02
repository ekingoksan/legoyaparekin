"use client"

import { addEmailSubscribe } from "@/actions/web/addEmailSubscribe";
import { useToast } from '@/hooks/use-toast';
import Puzzle from "icons/lineal/Puzzle";
import { useForm } from "react-hook-form";

export default function CTA5() {

  const form = useForm({
    defaultValues: {
      email: "",
    }
  })

  const { register, handleSubmit, formState: { errors } } = form;
  const toast = useToast();

  interface FormData {
    email: string;
  }

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    const res = await addEmailSubscribe(formData);

    if(res.status === 200) {
      form.reset();
      return toast.toast({
        title: 'Başarılı',
        description: res.message,
        variant: 'success',
        duration: 2000,
      })
    }else{
      return toast.toast({
        title: 'Hata',
        description: res.message,
        variant: 'destructive',
        duration: 2000,
      })
    }
  }

  return (
    <section className="wrapper bg-soft-primary">
      <div className="container py-14 py-md-16 text-center">
        <div className="row">
          <div className="col-md-9 col-lg-7 col-xl-7 mx-auto text-center">
            <div className="flex justify-center items-center">
              <Puzzle />
            </div>

            <h2 className="display-4 mb-3">E-Posta Aboneliği</h2>
            <p className="lead fs-lg mb-6 px-xl-10 px-xxl-15">
              Bizden haberler almak için e-postanızı sistemimize kaydedin. En güncel haberler ve kampanyalardan haberdar olun.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-lg-5 col-xl-4 mx-auto">
            <div className="newsletter-wrapper">
              <div id="mc_embed_signup2">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                 >
                  <div id="mc_embed_signup_scroll2">
                    <div className="mc-field-group input-group form-floating">
                      <input
                        type="email"
                        id="mce-EMAIL2"
                        autoComplete="off"
                        placeholder="E-Posta Adresiniz"
                        className="required email form-control"
                        {...register("email", { required: true })}
                      />
                      <label htmlFor="mce-EMAIL2" className="text-start">
                        E-Posta
                      </label>

                      <input
                        type="submit"
                        value="Abone Ol"
                        name="subscribe"
                        id="mc-embedded-subscribe2"
                        className="btn btn-primary"
                      />
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
      </div>
    </section>
  );
}
