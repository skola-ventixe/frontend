"use client";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import styles from "./events.module.css";
import Button from "@/components/utility/button/button";
import ButtonRound from "@/components/utility/buttonround/buttonround";
import { ArrowDown, ArrowUp, Plus, SlidersHorizontal } from "lucide-react";
import EventCard from "@/components/utility/cards/eventcard/eventcard";
import { getAllEvents, EventProps } from "@/services/eventService";
import { getEventLocation, getEventStatus } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import PopoverMenu from "@/components/utility/popovermenu/popovermenu";
import Link from "next/link";

function Events() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventProps[]>([]);
  const [filter, setFilter] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const storedFilter = localStorage.getItem("eventFilter");
      if (
        storedFilter &&
        ["all", "active", "draft", "past"].includes(storedFilter)
      ) {
        return storedFilter;
      }
      return "all";
    }
    return "all";
  });
  const [filteredEvents, setFilteredEvents] = useState<EventProps[]>([]);
  const [sortField, setSortField] = useState<
    "venue" | "eventName" | "startDate"
  >(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("eventSortField");
      if (
        storedValue === "venue" ||
        storedValue === "eventName" ||
        storedValue === "startDate"
      ) {
        return storedValue;
      }
    }
    return "venue";
  });

  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(() => {
    if (typeof window !== "undefined") {
      const storedDirection = localStorage.getItem("eventSortDirection");
      if (storedDirection === "asc" || storedDirection === "desc") {
        return storedDirection;
      }
    }
    return "asc";
  });

  const sortedEvents = useMemo(() => {
    if (sortField === "venue" || sortField === "eventName") {
      return [...filteredEvents].sort((a, b) => {
        const aValue = sortField === "venue" ? a.venue : a.eventName;
        const bValue = sortField === "venue" ? b.venue : b.eventName;

        if (sortDirection === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
    } else if (sortField === "startDate") {
      return [...filteredEvents].sort((a, b) => {
        const aDate = new Date(a.startDate).getTime();
        const bDate = new Date(b.startDate).getTime();

        if (sortDirection === "asc") {
          return aDate - bDate;
        } else {
          return bDate - aDate;
        }
      });
    }
  }, [filteredEvents, sortField, sortDirection]);

  const eventCounts = useMemo(() => {
    if (!events.length) return { all: 0, active: 0, draft: 0, past: 0 };

    return {
      all: events.length,
      active: events.filter(
        (event) =>
          getEventStatus(
            new Date(event.ticketSalesStart),
            new Date(event.endDate)
          ) === "Active"
      ).length,
      draft: events.filter(
        (event) =>
          getEventStatus(
            new Date(event.ticketSalesStart),
            new Date(event.endDate)
          ) === "Draft"
      ).length,
      past: events.filter(
        (event) =>
          getEventStatus(
            new Date(event.ticketSalesStart),
            new Date(event.endDate)
          ) === "Past"
      ).length,
    };
  }, [events]);

  useEffect(() => {
    localStorage.setItem("eventFilter", filter);
  }, [filter]);

  useEffect(() => {
    localStorage.setItem("eventSortField", sortField);
  }, [sortField]);

  useEffect(() => {
    localStorage.setItem("eventSortDirection", sortDirection);
  }, [sortDirection]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredEvents(events);
      return;
    }

    const filtered = events.filter(
      (event) =>
        getEventStatus(
          new Date(event.ticketSalesStart),
          new Date(event.endDate)
        ) ===
        filter.charAt(0).toUpperCase() + filter.slice(1) // Capitalize first letter
    );

    setFilteredEvents(filtered);
  }, [filter, events]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        setEvents(response);
        setFilteredEvents(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <ProtectedRoute>
      <main className={styles.main}>
        <section className={styles.filtersGrid}>
          <div className={`${styles.filterWrapper} ${styles.left}`}>
            <Button
              type="button"
              variant={filter === "all" ? "primary" : "ghost"}
              size="md"
              className={styles.left}
              onClick={() => setFilter("all")}
            >
              All ({eventCounts.all})
            </Button>
            <Button
              type="button"
              variant={filter === "active" ? "primary" : "ghost"}
              size="md"
              onClick={() => setFilter("active")}
            >
              Active ({eventCounts.active})
            </Button>
            <Button
              type="button"
              variant={filter === "draft" ? "primary" : "ghost"}
              size="md"
              className={styles.left}
              onClick={() => setFilter("draft")}
            >
              Draft ({eventCounts.draft})
            </Button>
            <Button
              type="button"
              variant={filter === "past" ? "primary" : "ghost"}
              size="md"
              onClick={() => setFilter("past")}
            >
              Past ({eventCounts.past})
            </Button>
          </div>
          <div className={`${styles.filterWrapper} ${styles.right}`}>
            <Link href="/events/create">
              <ButtonRound type="button" variant="primary" size="lg">
                <Plus />
              </ButtonRound>
            </Link>
            <PopoverMenu
              trigger={
                <ButtonRound type="button" variant="secondary" size="lg">
                  <SlidersHorizontal />
                </ButtonRound>
              }
              align="right"
              className={styles.sortButtonMenu}
            >
              <label htmlFor="sortField" className={styles.label}>
                Sort by:
              </label>
              <div className={styles.sortButtonInputs}>
                <select
                  id="sortField"
                  value={sortField}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSortField(value as "venue" | "eventName" | "startDate");
                  }}
                  className={styles.select}
                >
                  <option value="venue">Venue</option>
                  <option value="startDate">Starting Date</option>
                  <option value="eventName">Event Name</option>
                </select>

                <ButtonRound
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() =>
                    setSortDirection((prev) =>
                      prev === "asc" ? "desc" : "asc"
                    )
                  }
                >
                  {sortDirection === "asc" ? <ArrowUp /> : <ArrowDown />}
                </ButtonRound>
              </div>
            </PopoverMenu>
          </div>
        </section>
        <section className={styles.eventGrid}>
          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : events.length > 0 ? (
            (sortedEvents ?? []).map((event) => (
              <Link
                key={event.id}
                href={{
                  pathname: `/events/details`,
                  query: { id: event.id },
                }}
              >
                <EventCard
                  key={event.id}
                  category="Music"
                  startPrice={50}
                  title={event.eventName}
                  location={getEventLocation(
                    event.venue,
                    event.city,
                    event.state,
                    event.country
                  )}
                  ticketsSold={event.attendeesCount}
                  totalTickets={event.maxAttendees}
                  ticketSalesStart={new Date(event.ticketSalesStart)}
                  start={new Date(event.startDate)}
                  end={new Date(event.endDate)}
                  imageUrl={event.eventImageUrl}
                />
              </Link>
            ))
          ) : (
            <div className={styles.noEvents}>No events found</div>
          )}
        </section>
      </main>
    </ProtectedRoute>
  );
}
export default Events;
