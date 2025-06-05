import { MapPin, Minus } from "lucide-react";
import styles from "./eventcard.module.css";
import Image from "next/image";
import StraightProgressBar from "../../progressbar/straightprogressbar/straightprogressbar";
import { getEventSalesProcent, getEventStatus } from "@/lib/utils";

type EventCardProps = {
  title?: string;
  start?: Date;
  end: Date;
  ticketSalesStart?: Date;
  location?: string;
  category?: string;
  ticketsSold?: number;
  totalTickets?: number;
  startPrice: number;
  imageUrl?: string;
};

function EventCard({
  title = "Working Title",
  start,
  end,
  ticketSalesStart,
  location = "TBD",
  category,
  ticketsSold,
  totalTickets,
  startPrice,
  imageUrl,
}: EventCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        {imageUrl ? (
          <Image
            width={500}
            height={500}
            src={`/${imageUrl}`}
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

        <div className={styles.categoryTag}>{category}</div>
        <div className={styles.statusTag}>
          {getEventStatus(ticketSalesStart, end)}
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.info}>
          <div className={styles.dateTime}>
            <div className={styles.date}>
              {start
                ? start?.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "TBD"}
            </div>
            <Minus className={styles.hyphen} />
            <div className={styles.time}>
              {start
                ? start?.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                : "TBD"}
            </div>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.location}>
            <MapPin size={14} />
            <span className={styles.locationText}>{location}</span>
          </div>
        </div>
        <div className={styles.sales}>
          <div className={styles.tickets}>
            <StraightProgressBar
              variant="primary"
              progress={getEventSalesProcent(ticketsSold, totalTickets)}
              size="md"
            />
            <h5>{getEventSalesProcent(ticketsSold, totalTickets)}%</h5>
          </div>
          <div className={styles.pricing}>
            <h4>${startPrice}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventCard;
