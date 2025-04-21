import prisma from '../utils/db';

export const createBorrowRecord = async (userId: number, bookId: number) => {
  return await prisma.borrow.create({
    data: {
      userId,
      bookId,
    },
  });
};

export const getBorrowRecords = async () => {
  return await prisma.borrow.findMany({
    include: {
      user: true,
      book: true,
    },
  });
};

export const getBorrowRecordById = async (id: number) => {
  return await prisma.borrow.findUnique({
    where: { id },
    include: {
      user: true,
      book: true,
    },
  });
};

export const updateBorrowRecord = async (id: number, returnedAt: Date) => {
  return await prisma.borrow.update({
    where: { id },
    data: { returnedAt },
  });
};

export const deleteBorrowRecord = async (id: number) => {
  return await prisma.borrow.delete({
    where: { id },
  });
};
