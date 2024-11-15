"use client";

import React, {useEffect} from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { SunEditorComponent } from "@/components/ui/suneditor";
import { useToast } from "@/hooks/use-toast";
import {addOrUpdateeBizKimizAciklamaBaslik} from '@/actions/admin/who-we-are/add-or-update/biz-kimiz-aciklama-baslik'
import { getWhoWeAre } from "@/actions/admin/who-we-are/get/get-who-we-are";
function BaslikveAciklama() {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    const result = await addOrUpdateeBizKimizAciklamaBaslik(data);
    if (result.status === 200) {
      toast({
        title: 'Başarılı',
        description: result.message,
        variant: 'success',
        duration: 2000,
      });
    } else {
      toast({
        title: 'Hata',
        description: result.message,
        variant: 'destrutive',
        duration: 2000,
      });
    }
  };

  const getData = async () => {
   const result =  await getWhoWeAre()

   if(result) {
        form.setValue('title', result.title)
        form.setValue('description', result.description)
   }
  }

  useEffect(() => {
    getData()
  }, [])

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
      <div className="grid gap-2 py-3">
        <Label className="font-bold">Hakkınızda</Label>
        <SunEditorComponent
          placeholder="Blog Metni"
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
