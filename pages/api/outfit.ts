import withProtect from "../../middleware/withProtect";
import connectDB from "../../middleware/dbConnect";
import Outfit from "../../models/Outfit";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ success: false });
  }

  const outfit = new Outfit({
    title: req.body.title,
    hour: req.body.hour,
  });

  try {
    await outfit.save();
    console.log("save outfit");
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

export default withProtect(connectDB(handler));
