import React, { useEffect, useState } from "react";
import axios from "axios";

const Guest = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/hr_community_speakers`,
          {
            params: {
              guest_types: ["guest", "chief_guest"],
            },
            paramsSerializer: (params) =>
              params.guest_types.map((v) => `guest_types=${v}`).join("&"),
          }
        );

        const sortedSpeakers = res.data.sort((a, b) => {
          const typeOrder = { chief_guest: 1, guest: 2 };
          const typeA = typeOrder[a.guest_type] || 3;
          const typeB = typeOrder[b.guest_type] || 3;

          if (typeA !== typeB) return typeA - typeB;

          const seqA = a.sequence_no ?? 999999;
          const seqB = b.sequence_no ?? 999999;
          return seqA - seqB;
        });

        setSpeakers(sortedSpeakers);
      } catch (err) {
        console.error("Error fetching:", err);
        setError("Failed to load guests");
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  if (error) return <p className="text-center text-red-500">{error}</p>;

  const grouped = speakers.reduce((acc, speaker) => {
    if (!acc[speaker.guest_type]) acc[speaker.guest_type] = [];
    acc[speaker.guest_type].push(speaker);
    return acc;
  }, {});

  const guestTypeOrder = ["chief_guest", "guest"];

  return (
    <>
      {guestTypeOrder.map((guestType) => {
        const group = grouped[guestType] || [];

        const { max_per_row = 3, image_align = "center" } =
          group[0] || {};

        const containerStyle =
          guestType === "chief_guest"
            ? {
                display: "flex",
                justifyContent: "center",
                gap: "0.5rem",
                flexWrap: "wrap",
                maxWidth: `${max_per_row * 260}px`,
                margin: "0 auto",
              }
            : {
                display: "grid",
                gridTemplateColumns: `repeat(${max_per_row}, minmax(0, 1fr))`,
                justifyItems: image_align,
                gap: "0.75rem",
                maxWidth: `${max_per_row * 260}px`,
                margin: "0 auto",
              };

        return (
          <section key={guestType} className="mb-10">
            <h1 className="text-3xl text-brand_orange mb-3 text-center">
              {guestType === "chief_guest" ? "Guests" : ""}
            </h1>
            <div style={containerStyle}>
              {loading
                ? Array.from({ length: max_per_row || 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-60 bg-white shadow-lg overflow-hidden border border-gray-200 animate-pulse"
                    >
                      <div className="w-full aspect-square bg-gray-200"></div>
                      <div className="p-4 text-center">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto"></div>
                      </div>
                    </div>
                  ))
                : group.map((speaker) => (
                    <div
                      key={speaker.speaker_id}
                      className="w-60 bg-white shadow-lg overflow-hidden border border-gray-200"
                    >
                      <div className="w-full aspect-square bg-white overflow-hidden">
                        <img
                          src={speaker.profile_image}
                          alt={speaker.speaker_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-base font-semibold text-gray-800">
                          {speaker.speaker_name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {speaker.designation}
                        </p>
                        {speaker.company_name && (
                          <p className="text-gray-600 text-sm mt-1">
                            {speaker.company_name}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
            </div>
          </section>
        );
      })}
    </>
  );
};

export default Guest;
