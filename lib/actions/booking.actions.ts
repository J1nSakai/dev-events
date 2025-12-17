"use server";

import { Booking } from "@/database";
import connectDB from "../mongoose";

export const createBooking = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectDB();

    await Booking.create({ eventId, slug, email });
    return { success: true };
  } catch (error) {
    console.error("Error creating booking");
    return { success: false };
  }
};
