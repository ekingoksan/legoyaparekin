"use server";
import { existsSync, unlink } from "fs";
import { db } from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";
const handleImageUpload = async (image, existingImageName) => {
  if (image != "undefined" && image != "null") {
    const imageSize = image.size / 1024 / 1024;
    if (imageSize > 2) {
      return {
        message: "image dosyası 2MB'dan büyük olamaz.",
        status: 400,
      };
    }
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const imageExt = path.extname(image.name);
    const imageNameRandom = `legoyapar_${Math.random()
      .toString(36)
      .substring(2, 15)}${imageExt}`;
    const imageName = imageNameRandom.replaceAll(" ", "_");
    await writeFile(
      path.join(process.cwd(), "public/images/site/" + imageName),
      imageBuffer
    );

    if (existingImageName) {
      if (existsSync(`public/images/site/${existingImageName}`)) {
        unlink(`public/images/site/${existingImageName}`, (err) => {
          if (err) {
            console.error("Dosya silinemedi:", err);
            return;
          }
          console.log("Dosya başarıyla silindi");
        });
      }
    }

    return {
      imageName,
      status: 200,
    };
  }
  return {
    message: "Geçersiz resim dosyası.",
    status: 400,
  };
};

export const addOrUpdateeBizKimizAciklamaBaslik = async (formData) => {
  // add or update

  const title = formData.get("title");
  const description = formData.get("description");
  const image_1 = formData.get("image_1");
  const image_2 = formData.get("image_2");

  const whoWeAre = await db.whoWeAre.findMany({});


  console.log({
    image_1,
    image_2,
  })


  // Usage example
  const resultImage1 = await handleImageUpload(image_1, whoWeAre?.[0]?.image_1);
  const resultImage2 = await handleImageUpload(image_2, whoWeAre?.[0]?.image_2);




  if (whoWeAre.length > 0) {
    console.log(description, "whoWeAre");

    const result = await db.whoWeAre.update({
      where: {
        id: whoWeAre[0].id,
      },
      data: {
        title,
        description,
        ...(resultImage1.imageName && { image_1: resultImage1.imageName }),
        ...(resultImage2.imageName && { image_2: resultImage2.imageName }),
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
        image_1: resultImage1.imageName,
        image_2: resultImage2.imageName,
      },
    });

    return {
      status: 200,
      message: "Ekleme işlemi başarılı",
    };
  }
};

export const addServices = async (services) => {
  if (!services || services.length === 0) {
    return {
      status: 400,
      message: "Alanlar boş olamaz",
    };
  }

  console.log(services, "services");

  services.map(async (service) => {
    const exists = await db.ourSkills.findFirst({
      where: {
        title: service.name,
      },
    });

    if (!exists) {
      const result = await db.ourSkills.create({
        data: {
          title: service.name,
        },
      });
    }
  });

  return {
    status: 200,
    message: "Başarıyla eklendi",
  };
};

export const getServices = async () => {
  const steps = await db.ourSkills.findMany({
    orderBy: {
      created_at: "asc",
    },
  });

  return steps;
};

export const deleteService = async (id) => {
  const exists = await db.ourSkills.findFirst({
    where: {
      id,
    },
  });

  if (!exists) {
    return {};
  }

  const result = await db.ourSkills.delete({
    where: {
      id,
    },
  });

  return {
    status: 200,
    message: "Başarıyla silindi",
  };
};
