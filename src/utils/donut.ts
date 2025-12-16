import L from "leaflet";
import "leaflet.markercluster";
import type { UserMarker } from "../types/map";
import type { User } from "../types/user";
import { map } from "../constants";

function getInterestCounts(users: User[]) {
  const counts: Record<string, number> = {};
  users.forEach((user) =>
    user.interests.forEach((i) => (counts[i] = (counts[i] || 0) + 1))
  );
  return counts;
}

export function createDonutClusterIcon(usersInCluster: User[]) {
  const counts = getInterestCounts(usersInCluster);
  const total = usersInCluster.length;

  let offset = 0;
  const slices = Object.entries(counts)
    .map(([interest, count]) => {
      const angle = (count / total) * 360;
      const start = offset;
      const end = offset + angle;
      offset += angle;

      const x1 = 50 + 50 * Math.sin((start * Math.PI) / 180);
      const y1 = 50 - 50 * Math.cos((start * Math.PI) / 180);
      const x2 = 50 + 50 * Math.sin((end * Math.PI) / 180);
      const y2 = 50 - 50 * Math.cos((end * Math.PI) / 180);
      const largeArc = angle > 180 ? 1 : 0;

      return `<path d="M50,50 L${x1},${y1} A50,50 0 ${largeArc},1 ${x2},${y2} Z" fill="${
        map.INTEREST_COLORS[interest] || "#ccc"
      }"></path>`;
    })
    .join("");

  const html = `
    <svg width="50" height="50" viewBox="0 0 100 100">
      ${slices}
      <circle cx="50" cy="50" r="25" fill="white"/>
      <text x="50" y="55" font-size="20" text-anchor="middle" fill="#000">${total}</text>
    </svg>
  `;

  return L.divIcon({
    html,
    className: "donut-cluster",
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  });
}

export const iconCreateFunction = (cluster: L.MarkerClusterGroup) => {
  const markers = cluster.getAllChildMarkers() as UserMarker[];
  const usersInCluster = markers.map((m) => m.options.user);
  return createDonutClusterIcon(usersInCluster);
};

export function getMarkerRef(user: User) {
  return (marker: UserMarker) => {
    if (marker) {
      marker.options.user = user;
    }
  };
}
