"use client";

import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { PlusIcon, TrashIcon } from "lucide-react";
import { addWorkSteps, deleteWorksSteps, getWorkSteps } from "@/actions/admin/nasil-calisiyoruz/add-or-update/nasil-calisiyoruz";


function Yeteneklerimiz() {
  const { toast } = useToast();
  const [steps, setSteps] = React.useState([]);

  const form = useForm({
    defaultValues: {
      steps: [{ name: "", id: "", title: "" }],
    },
  });

  useEffect(() => {
    form.setValue(
      "steps",
      steps?.map((service) => ({ title: service.title, id: service.id, name: service.description }))
    );
  }, [steps]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "steps",
  });

  const fetchsteps = async () => {
    const response = await getWorkSteps();
    setSteps(response);
  };


  useEffect(() => {
    fetchsteps();
  }, []);

  const onSubmit = async (data) => {
    console.log(data, "data");
    const result = await addWorkSteps(data.steps);

    if (result.status === 200) {
      toast({
        title: "Başarılı",
        description: result.message,
        variant: "success",
        duration: 2000,
      });

      fetchsteps();
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
    const result = await deleteWorksSteps(id);

    if (result.status === 200) {
      toast({
        title: "Başarılı",
        description: result.message,
        variant: "success",
        duration: 2000,
      });

      fetchsteps();
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

  console.log(steps, "services");

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1 mb-5">
        <div className="flex justify-between">
          <Label>Çalışma Adımı Ekle</Label>
          <Button size="sm" type="button" onClick={() => append({ name: "" })}>
            <PlusIcon className="w-6 h-6 text-primary-500 shrink-0" />
          </Button>
        </div>
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="relative mb-2">
              <div className="flex items-center gap-x-2">
                <div className="w-full">
                  <Input
                    type="text"
                    name={`steps[${index}].title`}
                    {...form.register(`steps.${index}.title`, {
                      required: "Bu alan zorunludur",
                    })}
                    placeholder={`Başlık ${index + 1}`}
                    className="w-full"
                  />
                      <div>
              {form.formState.errors.steps?.[index]?.name && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.steps[index].name.message}
                </p>
              )}
            </div>
                </div>

                <div className="w-full">
                  <Input
                    type="text"
                    name={`steps[${index}].name`}
                    {...form.register(`steps.${index}.name`, {
                      required: "Bu alan zorunludur",
                    })}
                    placeholder={`Açıklama ${index + 1}`}
                    className="w-full"
                  />

<div>
              {form.formState.errors.steps?.[index]?.name && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.steps[index].name.message}
                </p>
              )}
            </div>
                </div>
              </div>

              <Button
                variant="outline"
                type="button"
                className="absolute right-0 top-5 transform -translate-y-1/2"
                onClick={() => {
                  _deleteService(steps[index].id);
                  remove(index);
                }}
              >
                <TrashIcon className="w-4 h-4 text-red-500" />
              </Button>
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
