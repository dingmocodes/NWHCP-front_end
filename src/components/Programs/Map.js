import React, { useState, useEffect, useRef, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "gatsby";
import iconLocation from "../../images/icon-location.svg";
import { Context as AllProgramContext } from "../../context/programContext";

import { getbound } from "../../utils/mapUtils";
// Component that displays a react leaflet map
// Centers itself around the average of the search results
function Map({ programs, setCenter, center, bounds, markerRefs, setMarkerRef }) {
  const [map, setMap] = useState(null);
  const programAllStates = useContext(AllProgramContext).state;

  const ChangeView = ({ bounds }) => {
    const map = useMap();
    // map.fitBounds(bounds);
    return null;
  };
  useEffect(() => {
    if (map) {
      map.fitBounds(bounds);
      console.log(bounds)
    }
  }, [bounds])

  // useEffect(() => {
  //   if (map) {
  //     map.fitBounds()
  //   }
  // }, [programs])

  useEffect(() => {
    if (map) {
      map.flyTo(center, 14, {
        animate: true,
        duration: 1.5
      });
    }
  }, [center]);

  const createMarker = (id) => {
    let marker = new L.Icon({
      iconUrl: iconLocation,
      iconSize: new L.Point(20, 30),
      className: "marker" + id,
    });
    return marker;
  };

  // // Set map parameters
  useEffect(() => {
    let minLat = 180,
      maxLat = -180;
    let minLng = 180,
      maxLng = -180;
    programs.forEach((program) => {
      let lat = program["latitude"];
      let lng = program["longitude"];
      if (lat < minLat) {
        minLat = lat;
      }
      if (lat > maxLat) {
        maxLat = lat;
      }
      if (lng < minLng) {
        minLng = lng;
      }
      if (lng > maxLng) {
        maxLng = lng;
      }
    });
    // console.log(minLat, maxLat, minLng, maxLng)
    if (minLat === maxLat || minLng === maxLng) {
      const adjustDegree = 0.05;
      minLat -= adjustDegree;
      minLng -= adjustDegree;
      maxLat += adjustDegree;
      maxLng += adjustDegree;
    }
    if (map) map.fitBounds([
      [minLat, minLng],
      [maxLat, maxLng],
    ]);
  }, [programAllStates.searchFilter.searchContent]);

  useEffect(() => {
    if (!map) return;
    console.log(map.getBounds());

    map.on("zoomend", function () {
      console.log(map.getBounds());
    });
  }, [map]);
  if (typeof window !== "undefined") {
    return (
      <div>
        <MapContainer
          style={{ height: "90vh" }}
          center={center}
          bounds={bounds}
          whenCreated={setMap}
          boundsOptions={{ padding: [20, 20] }}
          id="mapid"
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {programs && programs.map((program) => {
            return <Marker
              key={program._id}
              position={[program.latitude || 47.6062, program.longitude || -122.3321]}
              icon={createMarker(program._id)
              }
            >
              <Popup>
                <span>
                  <h4>{program.org_name || program.org_name_v2}</h4>
                  <p>
                    {program.street_address_1 || program.street_address_1_v2},
                    {program.street_address_2 || program.street_address_2_v2}
                    <br />
                    {`${program.org_city || program.org_city_v2}, 
                ${program.org_state || program.org_state_v2}
                ${(program.zip_code || program.zip_code_v2).slice(0, 5)}`}
                    <br />
                    {program.org_phone_number || program.org_phone_number_v2}
                  </p>
                  <Link to={`/orgs/${program._id}`} state={program}>
                    More Details
                  </Link>
                </span>
              </Popup>
            </ Marker>
          })}
          <ChangeView bounds={bounds} />
        </MapContainer>
      </div>
    );
  }
  return null;
}

export default Map;