"use client";

import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { PlusIcon, TrashIcon } from "lucide-react";
import {
  addServices,
  deleteService,
  getServices,
} from "@/actions/admin/who-we-are/add-or-update/biz-kimiz-aciklama-baslik";

function Yeteneklerimiz() {
  const { toast } = useToast();
  const [services, setServices] = React.useState([]);

  const form = useForm({
    defaultValues: {
      services: [{ name: "", id: "" }],
    },
  });

  useEffect(() => {
    form.setValue(
      "services",
      services?.map((service) => ({ name: service.title, id: service.id }))
    );
  }, [services]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "services",
  });

  const fetchServices = async () => {
    const response = await getServices();
    setServices(response);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const onSubmit = async (data) => {
    const result = await addServices(data.services);

    if (result.status === 200) {
      toast({
        title: "Başarılı",
        description: result.message,
        variant: "success",
        duration: 2000,
      });

      fetchServices();

    } else {
      toast({
        title: "Hata",
        description: result.message,
        variant: "destrutive",
        duration: 2000,
      });
      
    }
  };


  const _deleteService = async (id) => {
    // deleteService
    const result = await deleteService(id);

    if (result.status === 200) {
      toast({
        title: "Başarılı",
        description: result.message,
        variant: "success",
        duration: 2000,
      });

      fetchServices();
    }

    if (result?.status === 400) {
      toast({
        title: "Hata",
        description: result.message,
        variant: "destrutive",
        duration: 2000,
      });
    }
  };

  console.log(services, "services");

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1 mb-5">
        <div className="flex justify-between">
          <Label>Hizmet Ekle</Label>
          <Button size="sm" type="button" onClick={() => append({ name: "" })}>
            <PlusIcon className="w-6 h-6 text-primary-500 shrink-0" />
          </Button>
        </div>
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="relative mb-2">
              <Input
                type="text"
                name={`services[${index}].name`}
                {...form.register(`services.${index}.name`, {
                  required: "Bu alan zorunludur",
                })}
                placeholder={`Hizmet ${index + 1}`}
                className="w-full"
              />

              <Button
                variant="outline"
                type="button"
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
                onClick={() => {
                  _deleteService(services[index].id);
                  remove(index);
                }}
              >
                <TrashIcon className="w-4 h-4 text-red-500" />
              </Button>
            </div>

            <div>
              {form.formState.errors.services?.[index]?.name && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.services[index].name.message}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-5">
        <Button variant="primary" size="lg">
          Kaydet
        </Button>
      </div>
    </form>
  );
}

export default Yeteneklerimiz;
