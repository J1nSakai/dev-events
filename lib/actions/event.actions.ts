"use server";

import connectDB from "../mongoose";
import Event from "@/database/event.model";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();

    const event = await Event.findOne({ slug });
    console.log("Event:", event);

    return await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean();
  } catch (error) {
    return [];
  }
};
