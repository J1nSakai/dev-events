export type EventItem = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events: EventItem[] = [
  {
    title: "Next.js Conf 2026",
    image: "/images/event1.png",
    slug: "nextjs-conf-2026",
    location: "Online & San Francisco, CA",
    date: "March 10–11, 2026",
    time: "09:00 - 18:00 PST",
  },
  {
    title: "Google I/O 2026",
    image: "/images/event2.png",
    slug: "google-io-2026",
    location: "Mountain View, CA",
    date: "May 14–16, 2026",
    time: "10:00 - 17:00 PDT",
  },
  {
    title: "Microsoft Build 2026",
    image: "/images/event3.png",
    slug: "microsoft-build-2026",
    location: "Seattle, WA",
    date: "May 20–22, 2026",
    time: "09:00 - 17:30 PDT",
  },
  {
    title: "AWS re:Invent 2025",
    image: "/images/event4.png",
    slug: "aws-reinvent-2025",
    location: "Las Vegas, NV",
    date: "Nov 26–29, 2025",
    time: "All day (varies by session)",
  },
  {
    title: "React Summit 2026",
    image: "/images/event5.png",
    slug: "react-summit-2026",
    location: "Amsterdam, Netherlands & Online",
    date: "April 21–22, 2026",
    time: "09:30 - 18:00 CET",
  },
  {
    title: "ETHGlobal Paris",
    image: "/images/event6.png",
    slug: "ethglobal-paris-2026",
    location: "Paris, France",
    date: "February 7–9, 2026",
    time: "10:00 - 20:00 CET",
  },
];
