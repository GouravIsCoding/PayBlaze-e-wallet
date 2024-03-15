import { PrismaClient } from "@prisma/client";

import { UserType, loginUserType } from "../validators";

const prisma = new PrismaClient();

const createUser = async (user: UserType) => {
  try {
    return prisma.$transaction(async () => {
      const exists = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });
      if (exists) {
        throw new Error("User already exists");
      }
      const result = await prisma.user.create({
        data: {
          ...user,
        },
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
        },
      });
      await prisma.account.create({
        data: {
          userId: result.id,
        },
      });
      return result;
    });
  } catch (error) {
    throw error;
  }
};

const getUser = async (user: loginUserType) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (!result) throw new Error("user does not exist");

    return {
      id: result.id,
      email: result?.email,
      password: result?.password,
      firstname: result.firstname,
      lastname: result.lastname,
    };
  } catch (error) {
    throw error;
  }
};
const getUserById = async (userId: number) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        image_id: true,
        image_url: true,
        account: {
          select: {
            balance: true,
          },
        },
      },
    });
    if (!result) throw new Error("user does not exist");

    return result;
  } catch (error) {
    throw error;
  }
};

const getUserList = async (filter: any) => {
  try {
    const result = await prisma.user.findMany({
      where: {
        OR: [
          {
            email: {
              contains: filter,
              mode: "insensitive",
            },
          },
          {
            firstname: {
              contains: filter,
              mode: "insensitive",
            },
          },
          {
            lastname: {
              contains: filter,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        firstname: "asc",
      },
    });
    const newResult = result.map((item) => {
      return {
        firstname: item.firstname,
        lastname: item.lastname,
        email: item.email,
        id: item.id,
      };
    });
    return newResult;
  } catch (error) {
    throw error;
  }
};
const uploadImage = async (
  image_id: string | undefined,
  image_url: string | undefined,
  userId: number
) => {
  try {
    const result = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image_id: image_id,
        image_url: image_url,
      },
    });
  } catch (error) {
    throw error;
  }
};

export { createUser, getUser, getUserById, getUserList, uploadImage };
