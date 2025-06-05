"use client";
import { EventProps, getEvent, Packages } from "@/services/eventService";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./eventdetails.module.css";
import DetailsInfoCard from "@/components/utility/cards/detailsinfocard/detailsinfocard";
import PackagesCard from "@/components/utility/cards/packagescard/packagescard";
import { CircleCheck, X } from "lucide-react";
import Button from "@/components/utility/button/button";
import { useAuth } from "@/context/authContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { AddTickets } from "@/services/ticketService";

function EventDetails() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const paramId = searchParams.get("id");

  const [event, setEvent] = useState<EventProps>();
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Packages | null>(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);

  function onClickPackage(pkg: Packages) {
    setSelectedPackage(pkg);
    setModalOpen(true);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const currentUser = user?.id;
    const names = Array.from(
      { length: purchaseQuantity },
      (_, i) => formData.get(`name-${i}`) as string
    );
    AddTickets(
      selectedPackage?.id || "",
      selectedPackage?.eventId || "",
      currentUser || "",
      names
    )
      .then((response) => {
        if (response.length > 0) {
          alert("Tickets purchased successfully!");
          setModalOpen(false);
          setSelectedPackage(null);
          setPurchaseQuantity(1);
        } else {
          alert(`Error: Something went wrong while purchasing tickets.`);
        }
      })
      .catch((error) => {
        console.error("Error purchasing tickets:", error);
        alert("Failed to purchase tickets. Please try again later.");
      });
    setPurchaseQuantity(1);
  }

  useEffect(() => {
    const fetchEvent = async () => {
      if (paramId) {
        setLoading(true);
        try {
          const eventData = await getEvent(paramId);
          setEvent(eventData);
        } catch (error) {
          console.error("Failed to load event:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchEvent();
  }, [paramId, modalOpen]);

  return (
    <ProtectedRoute>
      <main className={styles.main}>
        {loading ? (
          <span className={styles.loading}>Loading...</span>
        ) : (
          <>
            <section className={styles.detailsInfo}>
              {event && <DetailsInfoCard event={event} />}
            </section>
            <section className={styles.packagesInfo}>
              {!event || !event.packages || event.packages.length === 0 ? (
                <span className={styles.noPackages}>No packages available</span>
              ) : (
                <PackagesCard
                  packages={event.packages}
                  onClick={onClickPackage}
                />
              )}
            </section>
          </>
        )}
        {modalOpen && selectedPackage && (
          <div className={styles.modal} onClick={() => setModalOpen(false)}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeButton}
                onClick={() => setModalOpen(false)}
              >
                <X size={18} />
              </button>

              <div className={styles.modalHeader}>
                <h2>{selectedPackage.name}</h2>
              </div>

              <div className={styles.modalBody}>
                <p>{selectedPackage.description}</p>

                <div className={styles.modalPrice}>
                  ${selectedPackage.price.toFixed(2)}
                  <span>per person</span>
                </div>

                <ul className={styles.featureList}>
                  <li>
                    <CircleCheck size={16} />{" "}
                    {selectedPackage.seated ? "Seated" : "Standing"}
                  </li>
                  <li>
                    <CircleCheck size={16} /> {selectedPackage.placement}
                  </li>
                </ul>

                <form onSubmit={handleSubmit} noValidate>
                  <div className={styles.formGroup}>
                    <label htmlFor="quantity">Quantity:</label>
                    <select
                      className={styles.quantitySelect}
                      name="quantity"
                      id="quantity"
                      value={purchaseQuantity}
                      onChange={(e) =>
                        setPurchaseQuantity(Number(e.target.value))
                      }
                    >
                      <option value="">Qty</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  {Array.from({ length: purchaseQuantity }).map((_, i) => (
                    <div key={i} className={styles.formGroup}>
                      <label htmlFor={`name-${i}`}>
                        Name on Ticket {i + 1}:
                      </label>
                      <input
                        key={i}
                        type="text"
                        name={`name-${i}`}
                        id={`name-${i}`}
                        placeholder="Name"
                        {...(i === 0 ? { autoFocus: true } : {})}
                      />
                    </div>
                  ))}
                  <Button
                    type="submit"
                    variant="primary"
                    size="xl"
                    className={styles.primaryButton}
                  >
                    Purchase Tickets
                  </Button>
                </form>
              </div>

              <div className={styles.modalActions}>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  className={styles.secondaryButton}
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}
export default EventDetails;
