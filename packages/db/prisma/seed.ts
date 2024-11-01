import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { number: '9999999999' },
    update: {
      number: '9999999999',
      password: await bcrypt.hash('alice',10),
      name: 'alice',
      Balance:{
        create: {
          amount: 20000,
          locked:0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "token_1",
          provider: "HDFC Bank",
        },
      },
    },
    create: {
      number: '9999999999',
      password: await bcrypt.hash('alice',10),
      name: 'alice',
      Balance:{
        create: {
          amount: 20000,
          locked:0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "token_1",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { number: '9999999998' },
    update: {
      number: '9999999998',
      password: await bcrypt.hash('bob',10),
      name: 'bob',
      Balance:{
        create:{
          amount:3000,
          locked:0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "token_2",
          provider: "HDFC Bank",
        },
      },
    },
    create: {
      number: '9999999998',
      password: await bcrypt.hash('bob',10),
      name: 'bob',
      Balance:{
        create:{
          amount:3000,
          locked:0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "token_2",
          provider: "HDFC Bank",
        },
      },
    },
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })