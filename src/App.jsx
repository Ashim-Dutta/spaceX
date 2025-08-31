// src/components/UpcomingLaunches.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UpcomingLaunches() {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v5/launches/upcoming")
      .then((res) => {
        setLaunches(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load launches");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center p-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500 p-6">{error}</p>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
      Upcoming SpaceX Launches
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {launches.map((launch, i) => (
          <div
            key={launch.id}
            className="bg-gray-900 rounded-xl p-4 shadow-lg border border-gray-700"
          >
            {/* Mission Patch */}
            {launch.links.patch.small? (
              <img
                src={launch.links.patch.large}
                alt={launch.name}
                className="w-24 h-24 mx-auto mb-3 object-contain"
              />
            ) : (
              <div className="w-24 h-24 mx-auto mb-3 flex items-center justify-center bg-gray-800 rounded-lg text-sm">
                No Patch
                </div>
                
                
            )}

            {/* Mission Info */}
            <h2 className="text-lg font-semibold mb-1 text-center">
              {launch.name}
            </h2>
            <h1 className="uppercase flex justify-center">Flight Number : { launch.flight_number}</h1>
            <p className="text-gray-400 text-sm text-center mb-2">
              {new Date(launch.date_utc).toLocaleString()}
            </p>
            {/* Video */}
            {launch.links.youtube_id ? (
              <div className="aspect-video mt-3">
                <iframe
                  className="w-full h-full rounded-md"
                  src={`https://www.youtube.com/embed/${launch.links.youtube_id}`}
                  title={launch.name}
                  allowFullScreen
                />
              </div>
            ) : (
              <p className="text-xs text-gray-500 text-center italic">
                No webcast available
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
