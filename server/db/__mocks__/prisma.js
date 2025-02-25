const prisma = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  
  export default prisma;
  