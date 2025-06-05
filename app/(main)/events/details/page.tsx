import { Suspense } from "react";
import EventDetailsContent from "./eventdetailscontent";

export default function EventDetailsPage() {
  return (
    <Suspense
      fallback={<div className="loading">Loading event details...</div>}
    >
      <EventDetailsContent />
    </Suspense>
  );
}
