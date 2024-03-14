import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getMyTransfers = async (userId: number) => {
  try {
    const result = await prisma.transaction.findMany({
      where: {
        OR: [
          {
            type: "TRANSFER",
            fromUserId: userId,
          },
          {
            type: "TRANSFER",
            toUserId: userId,
          },
        ],
      },
      select: {
        fromUser: {
          select: {
            user: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
              },
            },
          },
        },
        toUser: {
          select: {
            user: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
              },
            },
          },
        },
        amount: true,
        id: true,
        timeStamp: true,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export { getMyTransfers };
