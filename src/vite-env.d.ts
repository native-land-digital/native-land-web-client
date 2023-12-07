/// <reference types="vite/client" />

// features returned as JSON from API request to server
// eg. http://native-land.ca/features/oceti-sakowin-sioux
interface NativeLandFeature {
  name: string;
  polygon: Feature;
  polygon_style: Record<color<string>>;
  pronunciation: null;
  category: "territories" | "languages" | "treaties";
  official_websites: null;
  created_at: Date;
  last_modified_at: Date;
  related: null;
  content: null;
}
