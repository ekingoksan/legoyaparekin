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
