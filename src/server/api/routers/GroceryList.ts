import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

// Define GroceryList so that it can be used as a zod schema 
// and as a return type for the procedure so that I don't get `any` 
// errors as the return type for the procedure
type GroceryList = {
  id: string;
  name: string;
  userId: string;
  items: {
    id: string;
    name: string;
    groceryListId: string;
    quantity?: number;
  }[];
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const prisma: PrismaClient = new PrismaClient();
const t = initTRPC.create();
export const publicProcedure = t.procedure;

export const groceryRouter = t.router({

  // Create a grocery list for a user (should be used when they log in for the first time)
  createGroceryList: t.procedure
    .input(
      z.object({
        userId: z.string(),
        // Allows the user to name their grocery list
        name: z.string(),
      }),
    )
    .output(
      z.object({
        id: z.string(),
        userId: z.string(),
        name: z.string(),
      }),
    )
    .query(async ({ input }): Promise<GroceryList> => {
      const groceryList = await prisma.groceryList.create({
        data: {
          name: input.name,
          userId: input.userId,
        },
      });

      return groceryList as GroceryList;
    }),

  getGroceryList: t.procedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .output(
      z.object({
        id: z.string(),
        userId: z.string(),
        items: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            quantity: z.number().optional(),
            groceryListId: z.string(),
          }),
        ),
      }).nullable(),
    )
    .query(async ({ input }): Promise<GroceryList> => {
      const groceryList = await prisma.groceryList.findUnique({
        where: { userId: input.userId },
        include: { items: true },
      });

      return groceryList as GroceryList;
    }),


});
