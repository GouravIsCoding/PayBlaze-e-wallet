import { PrismaClient } from "@prisma/client";

import { transferType, addBalanceType } from "../validators";

const prisma = new PrismaClient();

const createTransfer = async (tranferData: transferType) => {
  try {
    return prisma.$transaction(async () => {
      const validToUser = await prisma.user.findUnique({
        where: {
          id: tranferData.toUserId,
        },
        select: {
          account: true,
        },
      });
      const validFromUser = await prisma.user.findUnique({
        where: {
          id: tranferData.fromUserId,
        },
        select: {
          account: true,
        },
      });
      if (!(validFromUser && validToUser)) {
        throw new Error("User does not exist");
      }
      if ((validFromUser.account?.balance || 0) < tranferData.amount) {
        throw new Error("Insufficient balance");
      }

      await prisma.account.update({
        where: {
          id: validFromUser.account?.id,
        },
        data: {
          balance: {
            decrement: tranferData.amount,
          },
        },
      });

      await prisma.account.update({
        where: {
          id: validToUser.account?.id,
        },
        data: {
          balance: {
            increment: tranferData.amount,
          },
        },
      });

      const result = await prisma.transaction.create({
        data: {
          amount: tranferData.amount,
          toUserId: tranferData.toUserId,
          fromUserId: tranferData.fromUserId,
          type: "TRANSFER",
        },
        select: {
          id: true,
          amount: true,
          toUser: true,
        },
      });
      return result;
    });
  } catch (error) {
    throw error;
  }
};

const addBalance = async (addBalanceData: addBalanceType) => {
  try {
    return await prisma.$transaction(async () => {
      const found = await prisma.user.findUnique({
        where: {
          id: addBalanceData.userId,
        },
        select: {
          firstname: true,
          lastname: true,
          account: true,
        },
      });
      if (!found) {
        throw new Error("account does not exist");
      }
      await prisma.transaction.create({
        data: {
          toUserId: addBalanceData.userId,
          amount: addBalanceData.amount,
          type: "DEPOSIT",
        },
      });
      const result = await prisma.account.update({
        where: {
          id: found.account?.id,
        },
        data: {
          balance: {
            increment: addBalanceData.amount,
          },
        },
        select: {
          balance: true,
        },
      });
      return {
        balance: result.balance,
        firstname: found.firstname,
        lastname: found.lastname,
      };
    });
  } catch (error) {
    throw error;
  }
};

export { createTransfer, addBalance };
