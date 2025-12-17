import Booking from "@/database/booking.model";
import { IEvent } from "@/database/event.model";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import { notFound } from "next/navigation";
import Image from "next/image";
import BookEvent from "./BookEvent";
import EventCard from "./EventCard";
import { cacheLife } from "next/cache";

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag) => (
      <div className="pill" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

const EventDetails = async ({ params }: { params: Promise<string> }) => {
  "use cache";
  cacheLife("hours");
  const slug = await params;

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  //   const response = await fetch(`${BASE_URL}/api/events/${slug}`);
  //   const { event } = await response.json();

  const bookings = (await Booking.countDocuments({ eventId: event._id })) || 0;

  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  if (!event) return notFound();
  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{event.description}</p>
      </div>
      <div className="details">
        {/* Left side - Event Content */}
        <div className="content">
          <Image
            src={event.image}
            alt="Event Banner"
            width={800}
            height={800}
            className="banner"
          />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{event.overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="calender"
              label={event.date}
            />
            <EventDetailItem
              icon="/icons/clock.svg"
              alt="clock"
              label={event.time}
            />
            <EventDetailItem
              icon="/icons/pin.svg"
              alt="pin"
              label={event.location}
            />
            <EventDetailItem
              icon="/icons/mode.svg"
              alt="mode"
              label={event.mode}
            />
            <EventDetailItem
              icon="/icons/audience.svg"
              alt="audience"
              label={event.audience}
            />
          </section>

          <EventAgenda agendaItems={event.agenda} />

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{event.organizer}</p>
          </section>

          <EventTags tags={event.tags} />
        </div>

        {/* Right side - Boking Form */}
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {bookings > 0 ? (
              <div className="text-sm">
                Join {bookings} others by booking your spot for this event!
              </div>
            ) : (
              <div className="text-sm">Be the first one to book your spot!</div>
            )}

            <BookEvent eventId={event._id} slug={event.slug} />
          </div>
        </aside>
      </div>

      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 &&
            similarEvents.map((similarEvent: IEvent, idx) => (
              <EventCard key={idx} {...similarEvent} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
