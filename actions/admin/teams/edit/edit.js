'use server'

import { existsSync, unlink } from "fs";
import { db } from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";
export const editTeamMember = async (data,id) => {
    const name_surname = data.get('name_surname');
    const job_title = data.get('job_title');
    const description = data.get('description');
    const instagram = data.get('instagram');
    const twitter = data.get('twitter');
    const linkedin = data.get('linkedin');
    const image = data.get('image');


    const teamMember = await db.myTeam.findFirst({
        where: {
            id: parseInt(id)
        },
        
    })

 

    let imageName = teamMember.image;


    if(image != 'undefined' && image != "null") {
        const imageSize = image.size / 1024 / 1024;
        if (imageSize > 2) {
            return {
                message: "image dosyası 2MB'dan büyük olamaz.",
                status: 400
            };
        }
        const imageBuffer = Buffer.from(await image.arrayBuffer());
        // image extension
        const imageExt = path.extname(image.name);
        // random image name
        const imageNameRandom = `legoyapar_${Math.random().toString(36).substring(2,15)}${imageExt}`;
        imageName = imageNameRandom.replaceAll(" ","_");
        await writeFile(
            path.join(process.cwd(),"public/images/site/"+imageName),
            imageBuffer
        )

        if(teamMember.image){
            if(existsSync(`public/images/site/${teamMember.image}`)){
                unlink(`public/images/site/${teamMember.image}`, (err) => {
                    if (err) {
                      console.error('Dosya silinemedi:', err);
                      return;
                    }
                    console.log('Dosya başarıyla silindi');
                  });
            }
        }
    }
    

    const result = await db.myTeam.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name_surname,
            job_title,
            description,
            instagram,
            twitter,
            linkedin,
            image: imageName
        }
    })

    if(result) {
        return {
            status: 200,
            message: "Yaptığımız işler başarıyla güncellendi.",
         
        }
    }else{
        return {
            status: 200,
            message: "Yaptığımız işler başarıyla hata oluştu.",
        }
    }
}