import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const aritcle = z.object({
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
  approved: z.boolean().default(false),
  checked: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const articleRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.void())
    .output(z.array(aritcle))
    .meta({ openapi: { method: "GET", path: "/articles" } })
    .query(async ({ ctx }) => {
      const articles = await ctx.prisma.article.findMany();

      return articles;
    }),

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .output(aritcle.nullable())
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
    .input(aritcle.extend({ id: z.string().optional() }))
    .output(aritcle)
    .meta({ openapi: { method: "POST", path: "/articles" } })
    .mutation(({ input, ctx }) => {
      return ctx.prisma.article.create({
        data: input,
      });
    }),

  update: publicProcedure
    .input(aritcle.partial())
    .output(aritcle)
    .meta({ openapi: { method: "PUT", path: "/articles" } })
    .mutation(({ input, ctx }) => {
      return ctx.prisma.article.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    }),

    getUncheckedArticles: publicProcedure
    .input(z.void())
    .output(z.array(aritcle))
    .meta({ openapi: { method: "GET", path: "/articles/unchecked" } })
    .query(async ({ ctx }) => {
      const articles = await ctx.prisma.article.findMany({
        where: {
          checked: false,
        },
      });

      return articles;
    }),

  approveArticle: publicProcedure
    .input(z.object({ id: z.string() }))
    .output(aritcle)
    .meta({ openapi: { method: "PUT", path: "/articles/{id}/approve" } })
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.article.update({
        where: {
          id: input.id,
        },
        data: {
          approved: true,
          checked: true,
        },
      });
    }),

  rejectArticle: publicProcedure
    .input(z.object({ id: z.string() }))
    .output(aritcle)
    .meta({ openapi: { method: "PUT", path: "/articles/{id}/reject" } })
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.article.update({
        where: {
          id: input.id,
        },
        data: {
          approved: false,
          checked: true,
        },
      });
    }),


    
});
