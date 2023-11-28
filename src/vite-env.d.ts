/// <reference types="vite/client" />

// features returned as JSON from server from API request
// eg. http://native-land.ca/features/oceti-sakowin-sioux
interface NativeLandFeature {
  name: string;
  polygon: Feature;
  polygon_style: null;
  pronunciation: null;
  category: "territories" | "languages" | "territories";
  official_websites: null;
  created_at: Date;
  last_modified_at: Date;
  related: null;
  content: null;
}
