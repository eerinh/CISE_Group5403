import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const aritlce = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  journal_name: z.string(),
  date: z.date(),
  approved: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const articleRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.void())
    .output(z.array(aritlce))
    .meta({ openapi: { method: "GET", path: "/articles" } })
    .query(async ({ ctx }) => {
      const articles = await ctx.prisma.article.findMany();

      return articles;
    }),

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .output(aritlce.nullable())
    .meta({ openapi: { method: "GET", path: "/articles/{id}" } })
    .query(async ({ input, ctx }) => {
      const article = await ctx.prisma.article.findFirst({
        where: {
          id: input.id,
        },
      });

      return article;
    }),

  create: publicProcedure
    .input(aritlce)
    .output(aritlce)
    .meta({ openapi: { method: "POST", path: "/articles" } })
    .query(({ input, ctx }) => {
      return ctx.prisma.article.create({
        data: input,
      });
    }),

  update: publicProcedure
    .input(aritlce)
    .output(aritlce)
    .meta({ openapi: { method: "PUT", path: "/articles" } })
    .mutation(({ input, ctx }) => {
      return ctx.prisma.article.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    }),
});
