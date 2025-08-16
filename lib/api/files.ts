import { db } from "../prisma";
import {
  File as FileDbType,
  Prisma,
} from '@prisma/client';

export async function uploadFile(data: Prisma.FileUncheckedCreateInput) {
  return await db.file.create({
    data: {
      name: data.name,
      url: data.url,
      fileType: data.fileType,
      createdById: data.createdById,
      id: data.id || undefined,
    },
  });
}

export async function getPDFFilebyId(id: string) {
  return await db.file.findUnique({
    where: {
      id,
    },
  });
}

export async function getAllPDFFiles(type: string) {
  return await db.file.findMany({
    where: {
      fileType: type,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAllPDF() {
  return await db.file.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}
export async function updatePost(postId: string, data: any) {
  return await db.file.update({
    where: {
      id: postId,
    },
    data,
  });
}

export async function deletePost(postId: string) {
  return await db.file.delete({
    where: {
      id: postId,
    },
  });
}
