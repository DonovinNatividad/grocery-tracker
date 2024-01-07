import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

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





// export const groceryRouter = router({
//     // Queries are the best place to fetch data
//     // These two backend procedures are used to show an example of what the procedures are supposed
//     // to look like. They are not used in the actual application
//     hello: publicProcedure.query(() => {
//         return {
//             message: 'hello world!',
//         };
//     }),
    
//     // This procedure is used to call the database and get the grocery list for a user 
//     // to display on the front-end
//     getGroceryList: publicProcedure
//       .input(
//         z.object({
//           userId: z.string(),
//         }),
//       )
//       .query(async (opts): Promise<GroceryList | null> => {
//         const groceryList: GroceryList | null = await prisma.groceryList.findUnique({
//           where: { userId: opts.input.userId },
//           include: { items: true },
//         });
//         if (groceryList === null) {
//           throw new Error('Grocery list not found');
//         }
//         return groceryList;
//       }),


//     addToGroceryList: publicProcedure
//         .input(
//             z.object({
//                     userId: z.string(),
//                     item: z.object({
//                     name: z.string(),
//                     quantity: z.number().optional(),
//                     groceryListId: z.string(),
//                 }),
//             })
//         )
//         .mutation(async ({ input }: { input: { userId: string, item: { name: string, quantity?: number, groceryListId: string } } }) => {

//             // Create the new GroceryItem
//             const newItem = await prisma.groceryItem.create({
//                 data: {
//                     ...input.item,
//                     groceryListId: input.item.groceryListId,
//                 },
//             });

//             return newItem;
//         }),

//     // addToInStock: publicProcedure
//     //     .input(
//     //         z.object({
//     //             userId: z.string(),
//     //             item: z.object({
//     //                 name: z.string(),
//     //                 quantity: z.number(),
//     //                 unit: z.string(),
//     //                 price: z.number(),
//     //                 expiryDate: z.date().optional(),
//     //                 inStockId: z.string().optional(),
//     //             }),
//     //         })
//     //     )
//     //     .mutation(async ({ input }: { input: { userId: string, item: { name: string, quantity: number, unit: string, price: number, expiryDate?: Date, inStockId?: string } } }) => {
//     //         const newItem = await prisma.groceryItem.create({
//     //             data: {
//     //                 ...input.item,
//     //                 inStock: {
//     //                     connect: { id: input.item.inStockId },
//     //                 },
//     //             },
//     //         });
//     //         return newItem;
//     //     }),

// });

