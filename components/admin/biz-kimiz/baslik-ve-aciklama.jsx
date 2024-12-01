"use client";

import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { SunEditorComponent } from "@/components/ui/suneditor";
import { useToast } from "@/hooks/use-toast";
import { addOrUpdateeBizKimizAciklamaBaslik } from "@/actions/admin/who-we-are/add-or-update/biz-kimiz-aciklama-baslik";
import { getWhoWeAre } from "@/actions/admin/who-we-are/get/get-who-we-are";
function BaslikveAciklama() {
  const { toast } = useToast();
  const [usingImage_1, setUsingImage_1] = React.useState("");
  const [usingImage_2, setUsingImage_2] = React.useState("");
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      image_1: "",
      image_2: "",
    },
  });

  const onSubmit = async (data) => {

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image_1", data.image_1[0]);
    formData.append("image_2", data.image_2[0]);

    console.log(data, 'image_2')



    const result = await addOrUpdateeBizKimizAciklamaBaslik(formData);
    if (result.status === 200) {
      toast({
        title: "Başarılı",
        description: result.message,
        variant: "success",
        duration: 2000,
      });

      getData();
    } else {
      toast({
        title: "Hata",
        description: result.message,
        variant: "destrutive",
        duration: 2000,
      });
    }
  };

  const getData = async () => {
    const result = await getWhoWeAre();

    if (result) {
      form.setValue("title", result.title);
      form.setValue("description", result.description);

      setUsingImage_1(`/images/site/${result.image_1}`);
      setUsingImage_2(`/images/site/${result.image_2}`);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1 mb-5">
        <Label>Başlık</Label>
        <Input
          type="text"
          name="title"
          {...form.register("title")}
          placeholder="Başlık"
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-1 mb-5">
        <Label>1. Görsel</Label>
        {usingImage_1 && (
          <div className="relative inline-block w-48 border p-3">
            <img
              src={usingImage_1}
              alt="Resim 1"
              className="w-full object-contain my-3"
            />
          </div>
        )}
        <Input
          type="file"
          name="image_1"
          {...form.register("image_1")}
          placeholder="Resim"
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-1 mb-5">
        <Label>2. Görsel</Label>
        {usingImage_2 && (
          <div className="relative inline-block w-48 border p-3">
            <img
              src={usingImage_2}
              alt="Resim 1"
              className="w-full object-contain my-3"
            />
          </div>
        )}
        <Input
          type="file"
          name="image_2"
          {...form.register("image_2")}
          placeholder="Resim"
          className="w-full"
        />
      </div>

      <div className="grid gap-2 py-3">
        <Label className="font-bold">Hakkınızda</Label>
        <SunEditorComponent
          placeholder="Açıklama Metni"
          value={form.watch("description")}
          setValue={(e) => form.setValue("description", e)}
        />
      </div>

      <div className="flex justify-end mt-5">
        <Button variant="primary" size="lg">
          Kaydet
        </Button>
      </div>
    </form>
  );
}

export default BaslikveAciklama;
