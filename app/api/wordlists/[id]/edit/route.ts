import prisma from "@/lib/prisma";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.query;
  const { words } = req.body;

  const updatedWordList = await prisma.wordList.update({
    where: {
      id: Number(id),
    },
    data: {
      words,
    },
  });

  return res.json(updatedWordList);
}
