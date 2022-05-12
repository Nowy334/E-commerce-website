import withProtect from "../../../middleware/withProtect";
import connectDB from "../../../middleware/dbConnect";
import Outfit from "../../../models/Outfit";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return res.status(400).json({ success: false });
  }

  const { outfitId } = req.query;

  try {
    let update;
    if (req.body.person === 1) {
      update = await Outfit.updateOne(
        { _id: outfitId },
        {
          $push: {
            momHours: {
              hour: req.body.hour,
              minute: req.body.minute,
              second: req.body.second,
            },
          },
        }
      );
    } else if (req.body.person === 2) {
      update = await Outfit.updateOne(
        { _id: outfitId },
        {
          $push: {
            kateHours: {
              hour: req.body.hour,
              minute: req.body.minute,
              second: req.body.second,
            },
          },
        }
      );
    }
    console.log(update);
    res.status(400).json({ message: "success" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export default withProtect(connectDB(handler));
