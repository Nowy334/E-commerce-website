import withProtect from "../../../middleware/withProtect";
import connectDB from "../../../middleware/dbConnect";
import Order from "../../../models/Order";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return res.status(400).json({ success: false });
  }

  const { orderId } = req.query;

  try {
    console.log(req.body);
    const update = await Order.updateOne(
      { _id: orderId },
      { $set: { archive: req.body.archive } }
    );
    res.json(update);
  } catch (err) {
    res.json({ message: err });
  }
};

export default withProtect(connectDB(handler));
