import * as mapboxgl from "mapbox-gl";
import { LngLatBounds, Map, Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
const Mapboxuniv = ({ data }: any) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);
  const markers = useRef<Marker[]>([]);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(4);

  useEffect(() => {
    if (mapContainer.current && !map.current) {
      const mapInstance = new mapboxgl.Map({
        accessToken: import.meta.env.YEXT_PUBLIC_MAP_API_KEY,
        container: mapContainer.current,
        center: [lng, lat],
        zoom: zoom,
      });
      map.current = mapInstance;
      const mapbox = map.current;
      mapbox.resize();
    }
  }, [mapContainer]);

  useEffect(() => {
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];
    const mapbox = map.current;
    if (mapbox && data.length > 0) {
      const bounds = new LngLatBounds();
      data.map((item: any) => {
        const el = document.createElement("div");
        el.className = "marker";

        new mapboxgl.Marker()
          .setLngLat({
            lng: item.rawData.yextDisplayCoordinate.longitude,
            lat: item.rawData.yextDisplayCoordinate.latitude,
          })
          .addTo(mapbox);
        bounds.extend([
          item.rawData.yextDisplayCoordinate.longitude,
          item.rawData.yextDisplayCoordinate.latitude,
        ]);
      });
      if (!bounds.isEmpty()) {
        mapbox.fitBounds(bounds, {
          padding: { top: 50, bottom: 50, left: 50, right: 50 },
          maxZoom: 15,
        });
      }
    }
  }, [data]);

  return <div ref={mapContainer} className="hidden md:map-container" />;
};

export default Mapboxuniv;
