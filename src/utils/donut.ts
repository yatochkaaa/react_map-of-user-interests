import L, { MarkerCluster, type LeafletMouseEvent } from "leaflet";
import type { UserMarker } from "../types/map";
import type { User } from "../types/user";
import { interestsList, map } from "../constants";
import "leaflet.markercluster";

function getInterestCounts(users: User[]) {
  const counts: Record<string, number> = {};
  let totalSlices = 0;

  users.forEach((user) => {
    user.interests.forEach((i) => {
      counts[i] = (counts[i] || 0) + 1;
      totalSlices++;
    });
  });

  return { counts, totalSlices };
}

export function createDonutClusterIcon(usersInCluster: User[]) {
  const { counts, totalSlices } = getInterestCounts(usersInCluster);
  let offset = 0;
  const outerR = 50;
  const innerR = 25;

  const slices = Object.entries(counts)
    .map(([interest, count]) => {
      const angle = (count / totalSlices) * 360;
      if (angle === 0) return "";

      const start = offset;
      const end = offset + angle;
      offset += angle;

      const x1 = 50 + outerR * Math.sin((start * Math.PI) / 180);
      const y1 = 50 - outerR * Math.cos((start * Math.PI) / 180);
      const x2 = 50 + outerR * Math.sin((end * Math.PI) / 180);
      const y2 = 50 - outerR * Math.cos((end * Math.PI) / 180);
      const largeArc = angle > 180 ? 1 : 0;

      return `<path d="M50,50 L${x1},${y1} A${outerR},${outerR} 0 ${largeArc},1 ${x2},${y2} Z" fill="${
        map.INTEREST_COLORS[interest] || "#ccc"
      }"></path>`;
    })
    .join("");

  const html = `
    <svg width="50" height="50" viewBox="0 0 100 100">
      ${slices}
      <circle cx="50" cy="50" r="${innerR}" fill="white"/>
      <text x="50" y="55" font-size="20" text-anchor="middle" fill="#000">${usersInCluster.length}</text>
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

export const getClusterInterestsText = (cluster: L.MarkerCluster) => {
  const markers = cluster.getAllChildMarkers() as UserMarker[];
  const counts: Record<string, number> = {};

  markers.forEach((m) => {
    m.options.user.interests.forEach((i) => {
      counts[i] = (counts[i] || 0) + 1;
    });
  });

  const sortedEntries = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return sortedEntries
    .map(([i, c]) => {
      const interest = interestsList.find((li) => li.id === i);
      return `<div style="display:flex;align-items:center;">
        <span style="width:10px;height:10px;background-color:${
          interest?.color
        };margin-right:4px;"></span>
        ${interest?.label || i}: ${c}
      </div>`;
    })
    .join("");
};

export const handleClusterMouseOver = (
  e: LeafletMouseEvent & { propagatedFrom: MarkerCluster }
) => {
  const cluster = e.propagatedFrom;
  const tooltipText = getClusterInterestsText(cluster);
  cluster
    .bindTooltip(tooltipText, { direction: "top", sticky: true })
    .openTooltip();
};

export const handleClusterMouseOut = (
  e: LeafletMouseEvent & { propagatedFrom: MarkerCluster }
) => {
  e.propagatedFrom.closeTooltip();
};
