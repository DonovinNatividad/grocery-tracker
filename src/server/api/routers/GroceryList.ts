import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const t = initTRPC.context<{ signGuestBook: () => Promise<void>}>().create();

const prisma = new PrismaClient();

export const router = t.router;
export const publicProcedure = t.procedure;

const appRouter = router({
    // Queries are the best place to fetch data
    hello: publicProcedure.query(() => {
        return {
            message: 'hello world!',
        };
    }),

    // These two backend procedures are used to show an example of what the procedures are supposed
    // to look like. They are not used in the actual application
    goodbye: publicProcedure.mutation(async (opts) => {
        await opts.ctx.signGuestBook();

        return {
            message: 'goodbye world!',
        };
    }),

    
    // This procedure is used to call the database and get the grocery list for a user 
    // to display on the front-end
    getGroceryList: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            }),
        )
        .query((opts) => {
            const groceryList = prisma.groceryList.findUnique({
                where: { userId: opts.input.userId },
                include: { items: true },
            });
            return groceryList;
            }),

    addToGroceryList: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                item: z.object({
                    name: z.string(),
                    quantity: z.number(),
                    unit: z.string(),
                    price: z.number(),
                    expiryDate: z.date().optional(),
                    inStockId: z.string().optional(),
                }),
            })
        )
        .mutation(async ({ input }: { input: { userId: string, item: { name: string, quantity: number, unit: string, price: number, expiryDate?: Date, inStockId?: string } } }) => {
            const newItem = await prisma.groceryItem.create({
                data: {
                    ...input.item,
                    groceryList: {
                        connect: { userId: input.userId },
                    },
                },
            });
            return newItem;
        }),

});

