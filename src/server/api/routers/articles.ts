import { Rating } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Article } from "~/types";

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
  approved: z.boolean().default(false),
  checked: z.boolean().default(false),
  averageRating: z.number().optional(),
  totalRatings: z.number().optional(),
  currentRating: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

interface ExtendedArticle extends Article {
  averageRating?: number;
  totalRatings?: number;
  currentRating?: number;
  ratings?: Rating[];
}

export const articleRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ userId: z.string().optional() }))
    .output(z.any())
    .meta({ openapi: { method: "GET", path: "/articles" } })
    .query(async ({ input, ctx }) => {
      const articles = await ctx.prisma.article.findMany({
        include: {
          ratings: true,
        },
      });

      for (const article of articles as ExtendedArticle[]) {
        if (!article.ratings) return;
        const totalRatings = article.ratings.reduce((sum, rating) => sum + rating.ratingAmount, 0,);
        article.averageRating = article.ratings.length ? totalRatings / article.ratings.length : 0;
        article.totalRatings = article.ratings.length;
        delete article.ratings; // If you don't want to send the ratings in the response

        if (input?.userId) {
          const ratings = await ctx.prisma.rating.findFirst({
            where: {
              userId: input.userId,
              articleId: article.id,
            },
          })
          article.currentRating = ratings?.ratingAmount ?? 0;
        }
      };


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
        include: {
          ratings: true, // Include ratings for the article
        },
      });

      // if (article) {
      //   const totalRatings = article.ratings.reduce(
      //     (sum, rating) => sum + rating.ratingAmount,
      //     0,
      //   );
      //   article.averageRating = article.ratings.length
      //     ? totalRatings / article.ratings.length
      //     : 0;
      //   delete article.ratings; // If you don't want to send the ratings in the response
      // }

      return article;
    }),

  create: publicProcedure
    .input(aritlce.extend({ id: z.string().optional() }))
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

  setRating: publicProcedure
    .input(z.object({ userId: z.string(), articleId: z.string(), rating: z.number() }))
    .output(z.void())
    .meta({ openapi: { method: "PUT", path: "/articles/rating" } })
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.rating.upsert({
        where: {
          userId_articleId: {
            userId: input.userId,
            articleId: input.articleId,
          }
        },
        update: {
          ratingAmount: input.rating,
        },
        create: {
          userId: input.userId,
          articleId: input.articleId,
          ratingAmount: input.rating,
        }
      });
    }),

  getRatings: publicProcedure
    .input(z.void())
    .output(z.array(z.object({ id: z.string(), rating: z.number() })))
    .meta({ openapi: { method: "GET", path: "/articles/rating" } })
    .query(async ({ ctx }) => {
      const articles = await ctx.prisma.article.findMany({
        select: {
          id: true,
          ratings: true,
        },
      });

      const ratings = articles.flatMap((article) =>
        article.ratings.map((rating) => ({
          id: article.id,
          rating: rating.ratingAmount,
        }))
      );

      return ratings;
    }),
});
