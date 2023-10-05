import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const aritlce = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  date: z.date(),
  journal_name: z.string(),
  se_practice: z.string(),
  claim: z.string(),
  result_of_evidence: z.string(),
  type_of_research: z.string(),
  type_of_participant: z.string(),
  approved: z.boolean(),
  checked: z.boolean(),
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
    .mutation(({ input, ctx }) => {
      return ctx.prisma.article.create({
        data: input,
      });
    }),

  update: publicProcedure
    .input(aritlce.partial())
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
