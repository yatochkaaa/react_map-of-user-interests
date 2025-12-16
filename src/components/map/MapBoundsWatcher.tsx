import type { LatLngBounds } from "leaflet";
import { useEffect } from "react";
import { useMapEvents } from "react-leaflet";

const MapBoundsWatcher = ({
  onBoundsChange,
  bounds,
}: {
  onBoundsChange: (bounds: LatLngBounds) => void;
  bounds: LatLngBounds | null;
}) => {
  const currentMap = useMapEvents({
    moveend: (e) => onBoundsChange(e.target.getBounds()),
    zoomend: (e) => onBoundsChange(e.target.getBounds()),
  });

  useEffect(() => {
    const newBounds = currentMap.getBounds();
    if (!bounds || !newBounds.equals(bounds)) {
      onBoundsChange(newBounds);
    }
  }, [currentMap, onBoundsChange, bounds]);

  return null;
};

export default MapBoundsWatcher;
