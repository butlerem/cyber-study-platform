import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../lib/mongodb";
import { UserProgress } from "../../../lib/models/UserProgress";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  switch (req.method) {
    case "GET":
      try {
        const { user_id, challenge_id } = req.query;
        const query: any = {};

        if (user_id) query.user_id = user_id;
        if (challenge_id) query.challenge_id = challenge_id;

        const progress = await UserProgress.find(query).populate(
          "challenge_id"
        );
        res.status(200).json(progress);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch user progress" });
      }
      break;

    case "POST":
      try {
        const progress = await UserProgress.create(req.body);
        res.status(201).json(progress);
      } catch (error) {
        res.status(500).json({ error: "Failed to create user progress" });
      }
      break;

    case "PUT":
      try {
        const { id } = req.query;
        const progress = await UserProgress.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.status(200).json(progress);
      } catch (error) {
        res.status(500).json({ error: "Failed to update user progress" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
