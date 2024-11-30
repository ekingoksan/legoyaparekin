'use server'
// whoWeAre
import { db } from "@/lib/db";

export const addOrUpdateeBizKimizAciklamaBaslik = async ({
  title,
  description,
}) => {
  // add or update

  const whoWeAre = await db.whoWeAre.findMany({});

  if (whoWeAre.length > 0) {
    const result = await db.whoWeAre.update({
      where: {
        id: whoWeAre[0].id,
      },
      data: {
        title,
        description,
      },
    });

    return {
      status: 200,
      message: "Güncelleme işlemi başarılı",
    };
  } else {
    const result = await db.whoWeAre.create({
      data: {
        title,
        description,
      },
    });

    return {
      status: 200,
      message: "Ekleme işlemi başarılı",
    };
  }
};


export const addServices = async (services) => {

  if(!services || services.length === 0) {
    return {
      status: 400,
      message: "Hizmetler boş olamaz"
    }
  }


  // remove all services
  await db.ourSkills.deleteMany({});


  services.map(async (service) => {
    const result = await db.ourSkills.create({
      data: {
        title: service.name,
      }
    })
  })

  return {
    status: 200,
    message : "Hizmetler başarıyla eklendi"
  }

}

export const getServices = async () => {
  const services = await db.ourSkills.findMany({});

  return services;
}

export const deleteService = async (id) => {


  const exists = await db.ourSkills.findFirst({
    where: {
      id
    }
  });

  if(!exists) {
   return {}
  }
  
  const result = await db.ourSkills.delete({
    where: {
      id
    }
  });

  return {
    status: 200,
    message: "Hizmet başarıyla silindi"
  }
}