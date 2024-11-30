'use server'
// whoWeAre
import { db } from "@/lib/db";

export const addOrUpdateeBizKimizAciklamaBaslik = async ({
  title,
  description,
}) => {
  // add or update

  console.log(description, "description");
  console.log(title, "title");

  const whoWeAre = await db.whoWeAre.findMany({});


  if (whoWeAre.length > 0) {
    console.log(description, "whoWeAre");

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


export const addWorkSteps = async (services) => {

  if(!services || services.length === 0) {
    return {
      status: 400,
      message: "Alanlar boş olamaz"
    }
  }


  services.map(async (service) => {

    const exists = await db.howItWorksSteps.findFirst({
      where: {
        title: service.title,
        description: service.name
      }
    });

    if(!exists) {
      const result = await db.howItWorksSteps.create({
        data: {
          title: service.title,
          description: service.name
        }
      })
    }

  })

  return {
    status: 200,
    message : "Başarıyla eklendi"
  }

}

export const getWorkSteps = async () => {
  const steps = await db.howItWorksSteps.findMany({
    orderBy: {
      created_at: 'asc'
    }
  });

  return steps;
}

export const deleteWorksSteps = async (id) => {


  const exists = await db.howItWorksSteps.findFirst({
    where: {
      id
    }
  });

  if(!exists) {
   return {}
  }
  
  const result = await db.howItWorksSteps.delete({
    where: {
      id
    }
  });

  return {
    status: 200,
    message: "Başarıyla silindi"
  }
}