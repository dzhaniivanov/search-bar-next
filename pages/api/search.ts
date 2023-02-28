import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { q: query } = req.query;

      if (typeof query !== "string") {
        throw new Error("invalid request");
      }

      const posts = await prisma.post.findMany({
        where: {
          OR: [
            {
              body: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              author: {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            },
          ],
        },
        include: {
          author: true,
        },
      });

      res.status(200).json({ posts });
    } catch (error) {
      res.status(500).end();
    }
  }
}
