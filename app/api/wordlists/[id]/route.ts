import prisma from "@/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.query;

  // Retrieve the wordlists object attributed to the session's user's id
  const wordlists = await prisma.wordList.findMany({
    where: {
      userId: session.user.id,
    },
  });

  // Find the wordlist in wordlists with req.query id being its id
  const wordlist = wordlists.find((wordlist) => wordlist.id === Number(id));

  if (!wordlist) {
    return res.status(404).json({ error: "Wordlist not found" });
  }

  return res.json(wordlist);
}
