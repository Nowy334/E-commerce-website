import withProtect from "../../../middleware/withProtect";
import connectDB from "../../../middleware/dbConnect";
import Outfit from "../../../models/Outfit";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(400).json({ success: false });
  }

  try {
    const outfits = await Outfit.find();
    res.status(200).json(outfits);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export default withProtect(connectDB(handler));
