import { CalendarHeart, MapPin, Minus } from "lucide-react";
import styles from "./detailsinfocard.module.css";
import Image from "next/image";
import { EventProps } from "@/services/eventService";
import StraightProgressBar from "../../progressbar/straightprogressbar/straightprogressbar";
import { getEventSalesProcent, getEventStatus } from "@/lib/utils";
import Button from "../../button/button";

function getLowestPackagePrice(event?: EventProps): string {
  if (!event || !event.packages || event.packages.length === 0) {
    return "NA";
  }

  const lowestPrice = Math.min(...event.packages.map((pkg) => pkg.price));

  return `$${lowestPrice.toFixed(2)}`;
}

function DetailsInfoCard({ event }: { event: EventProps }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        {event.eventImageUrl ? (
          <Image
            width={500}
            height={500}
            src={`/${event.eventImageUrl}`}
            alt="Event image"
            className={styles.image}
          />
        ) : (
          <Image
            width={500}
            height={500}
            src={`/event-placeholder.png`}
            alt="Event placeholder image"
            className={styles.image}
          />
        )}

        <div className={styles.categoryTag}>Music</div>
        <div className={styles.statusTag}>
          {getEventStatus(
            new Date(event.ticketSalesStart),
            new Date(event.endDate)
          )}
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.info}>
          <h3 className={styles.tPackagesServiceitle}>{event.eventName}</h3>
          <div className={styles.dateTime}>
            <CalendarHeart size={16} />
            <div className={styles.date}>
              {event.startDate
                ? new Date(event.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "TBD"}
            </div>
            <Minus className={styles.hyphen} />
            <div className={styles.time}>
              {event.startDate
                ? new Date(event.startDate).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                : "TBD"}
            </div>
          </div>
          <div className={styles.location}>
            <MapPin size={14} />
            <span className={styles.locationText}>{event.venue}</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={styles.mapButton}
            >
              Show Map
            </Button>
          </div>
        </div>

        <div className={styles.sales}>
          <div className={styles.tickets}>
            <span>{event.attendeesCount}</span>
            <StraightProgressBar
              variant="primary"
              progress={getEventSalesProcent(
                event.attendeesCount,
                event.maxAttendees
              )}
              size="md"
            />
            <h5>
              {getEventSalesProcent(event.attendeesCount, event.maxAttendees)}%
            </h5>
          </div>
          <div className={styles.pricing}>
            <h4>{getLowestPackagePrice(event)}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailsInfoCard;
