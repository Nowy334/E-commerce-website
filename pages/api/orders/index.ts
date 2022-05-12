import withProtect from "../../../middleware/withProtect";
import connectDB from "../../../middleware/dbConnect";
import Order from "../../../models/Order";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(400).json({ success: false });
  }

  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.json({ message: err });
  }
};

export default withProtect(connectDB(handler));
