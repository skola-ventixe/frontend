"use client";
import { useState } from "react";
import styles from "./create.module.css";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Button from "@/components/utility/button/button";
import { Plus, Minus } from "lucide-react";
import {
  EventProps,
  Packages,
  Benefit,
  AddEvent,
} from "@/services/eventService";
import { useRouter } from "next/navigation";

function CreateNewEvent() {
  const router = useRouter();
  const [eventData, setEventData] = useState<
    Omit<EventProps, "id" | "attendeesCount">
  >({
    eventName: "",
    eventDescription: "",
    venue: "",
    streetAddress: "",
    city: "",
    zipCode: "",
    state: "",
    country: "",
    startDate: "",
    endDate: "",
    ticketSalesStart: "",
    eventImageUrl: "",
    maxAttendees: 0,
    packages: [
      {
        id: "", // Will be assigned by backend
        eventId: "", // Will be assigned by backend
        name: "",
        price: 0,
        description: "",
        seated: false,
        placement: "",
        benefits: [{ description: "" }],
      },
    ],
  });

  // Handle input changes for main event fields
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" ? parseInt(value) : value;

    setEventData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Handle package changes
  const handlePackageChange = (
    index: number,
    field: keyof Packages,
    value: any
  ) => {
    setEventData((prev) => {
      const updatedPackages = [...prev.packages];
      updatedPackages[index] = {
        ...updatedPackages[index],
        [field]: field === "seated" ? value === "true" : value,
      };
      return { ...prev, packages: updatedPackages };
    });
  };

  // Handle benefit changes
  const handleBenefitChange = (
    packageIndex: number,
    benefitIndex: number,
    value: string
  ) => {
    setEventData((prev) => {
      const updatedPackages = [...prev.packages];
      const updatedBenefits = [...updatedPackages[packageIndex].benefits];
      updatedBenefits[benefitIndex] = {
        ...updatedBenefits[benefitIndex],
        description: value,
      };
      updatedPackages[packageIndex] = {
        ...updatedPackages[packageIndex],
        benefits: updatedBenefits,
      };
      return { ...prev, packages: updatedPackages };
    });
  };

  // Add a new package
  const addPackage = () => {
    setEventData((prev) => ({
      ...prev,
      packages: [
        ...prev.packages,
        {
          id: "",
          eventId: "",
          name: "",
          price: 0,
          description: "",
          seated: false,
          placement: "",
          benefits: [{ description: "" }],
        },
      ],
    }));
  };

  // Add a new benefit to a package
  const addBenefit = (packageIndex: number) => {
    setEventData((prev) => {
      const updatedPackages = [...prev.packages];
      updatedPackages[packageIndex] = {
        ...updatedPackages[packageIndex],
        benefits: [
          ...updatedPackages[packageIndex].benefits,
          { description: "" },
        ],
      };
      return { ...prev, packages: updatedPackages };
    });
  };

  // Remove a package
  const removePackage = (packageIndex: number) => {
    setEventData((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, index) => index !== packageIndex),
    }));
  };

  // Remove a benefit
  const removeBenefit = (packageIndex: number, benefitIndex: number) => {
    setEventData((prev) => {
      const updatedPackages = [...prev.packages];
      updatedPackages[packageIndex] = {
        ...updatedPackages[packageIndex],
        benefits: updatedPackages[packageIndex].benefits.filter(
          (_, index) => index !== benefitIndex
        ),
      };
      return { ...prev, packages: updatedPackages };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitting event data:", eventData);

    try {
      const response = await AddEvent(eventData);
      console.log("Event created successfully:", response);
      // Redirect to Event page with nextjs router
      router.push("/events");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <ProtectedRoute>
      <main className={styles.main}>
        <div className={styles.heading}>
          <h3>Create New Event</h3>
          <p>Use the form below to create a new event.</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <section className={styles.formSection}>
            <h4>Event Details</h4>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="eventName">Event Name*</label>
                <input
                  type="text"
                  id="eventName"
                  name="eventName"
                  value={eventData.eventName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter event name"
                />
              </div>

              <div className={styles.formGroupFull}>
                <label htmlFor="eventDescription">Description*</label>
                <textarea
                  id="eventDescription"
                  name="eventDescription"
                  value={eventData.eventDescription}
                  onChange={handleInputChange}
                  required
                  placeholder="Describe your event"
                  rows={4}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="eventImageUrl">Image URL</label>
                <input
                  type="text"
                  id="eventImageUrl"
                  name="eventImageUrl"
                  value={eventData.eventImageUrl}
                  onChange={handleInputChange}
                  placeholder="URL to event image"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="maxAttendees">Maximum Attendees*</label>
                <input
                  type="number"
                  id="maxAttendees"
                  name="maxAttendees"
                  min="1"
                  value={eventData.maxAttendees}
                  onChange={handleInputChange}
                  required
                  placeholder="Maximum number of attendees"
                />
              </div>
            </div>
          </section>

          <section className={styles.formSection}>
            <h4>Date & Time</h4>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="startDate">Start Date & Time*</label>
                <input
                  type="datetime-local"
                  id="startDate"
                  name="startDate"
                  value={eventData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="endDate">End Date & Time*</label>
                <input
                  type="datetime-local"
                  id="endDate"
                  name="endDate"
                  value={eventData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="ticketSalesStart">Ticket Sales Start*</label>
                <input
                  type="datetime-local"
                  id="ticketSalesStart"
                  name="ticketSalesStart"
                  value={eventData.ticketSalesStart}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </section>

          <section className={styles.formSection}>
            <h4>Location</h4>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="venue">Venue*</label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  value={eventData.venue}
                  onChange={handleInputChange}
                  required
                  placeholder="Venue name"
                />
              </div>

              <div className={styles.formGroupFull}>
                <label htmlFor="streetAddress">Street Address*</label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={eventData.streetAddress}
                  onChange={handleInputChange}
                  required
                  placeholder="Street address"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="city">City*</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={eventData.city}
                  onChange={handleInputChange}
                  required
                  placeholder="City"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="zipCode">Zip Code*</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={eventData.zipCode}
                  onChange={handleInputChange}
                  required
                  placeholder="Zip/Postal code"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="state">State*</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={eventData.state}
                  onChange={handleInputChange}
                  required
                  placeholder="State/Province"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="country">Country*</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={eventData.country}
                  onChange={handleInputChange}
                  required
                  placeholder="Country"
                />
              </div>
            </div>
          </section>

          <section className={styles.formSection}>
            <div className={styles.sectionHeader}>
              <h4>Ticket Packages</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPackage}
              >
                <Plus size={16} /> Add Package
              </Button>
            </div>

            {eventData.packages.map((pkg, packageIndex) => (
              <div key={packageIndex} className={styles.packageContainer}>
                <div className={styles.packageHeader}>
                  <h5>Package {packageIndex + 1}</h5>
                  {packageIndex > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removePackage(packageIndex)}
                      className={styles.removeButton}
                    >
                      <Minus size={16} /> Remove
                    </Button>
                  )}
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor={`package-${packageIndex}-name`}>
                      Name*
                    </label>
                    <input
                      type="text"
                      id={`package-${packageIndex}-name`}
                      value={pkg.name}
                      onChange={(e) =>
                        handlePackageChange(
                          packageIndex,
                          "name",
                          e.target.value
                        )
                      }
                      required
                      placeholder="Package name"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor={`package-${packageIndex}-price`}>
                      Price*
                    </label>
                    <input
                      type="number"
                      id={`package-${packageIndex}-price`}
                      value={pkg.price}
                      onChange={(e) =>
                        handlePackageChange(
                          packageIndex,
                          "price",
                          parseFloat(e.target.value)
                        )
                      }
                      required
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                    />
                  </div>

                  <div className={styles.formGroupFull}>
                    <label htmlFor={`package-${packageIndex}-description`}>
                      Description*
                    </label>
                    <textarea
                      id={`package-${packageIndex}-description`}
                      value={pkg.description}
                      onChange={(e) =>
                        handlePackageChange(
                          packageIndex,
                          "description",
                          e.target.value
                        )
                      }
                      required
                      placeholder="Package description"
                      rows={2}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor={`package-${packageIndex}-seated`}>
                      Seating*
                    </label>
                    <select
                      id={`package-${packageIndex}-seated`}
                      value={pkg.seated.toString()}
                      onChange={(e) =>
                        handlePackageChange(
                          packageIndex,
                          "seated",
                          e.target.value
                        )
                      }
                      required
                    >
                      <option value="true">Seated</option>
                      <option value="false">Standing</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor={`package-${packageIndex}-placement`}>
                      Placement*
                    </label>
                    <input
                      type="text"
                      id={`package-${packageIndex}-placement`}
                      value={pkg.placement}
                      onChange={(e) =>
                        handlePackageChange(
                          packageIndex,
                          "placement",
                          e.target.value
                        )
                      }
                      required
                      placeholder="Front, Back, VIP, etc."
                    />
                  </div>
                </div>

                <div className={styles.benefitsSection}>
                  <div className={styles.benefitsHeader}>
                    <h6>Benefits</h6>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addBenefit(packageIndex)}
                    >
                      <Plus size={14} /> Add Benefit
                    </Button>
                  </div>

                  {pkg.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className={styles.benefitRow}>
                      <input
                        type="text"
                        value={benefit.description}
                        onChange={(e) =>
                          handleBenefitChange(
                            packageIndex,
                            benefitIndex,
                            e.target.value
                          )
                        }
                        placeholder="Benefit description"
                        required
                      />
                      {benefitIndex > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            removeBenefit(packageIndex, benefitIndex)
                          }
                          className={styles.removeBenefitButton}
                        >
                          <Minus size={14} />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <div className={styles.formActions}>
            <Button type="submit" variant="primary" size="md">
              Create Event
            </Button>
            <Button type="button" variant="outline" size="md">
              Cancel
            </Button>
          </div>
        </form>
      </main>
    </ProtectedRoute>
  );
}

export default CreateNewEvent;
