/// <reference types="vite/client" />

// features returned as JSON from API request to server
// eg. http://native-land.ca/features/oceti-sakowin-sioux
interface NativeLandFeature {
  name: string;
  polygon: Feature;
  polygon_style: FeaturePolygonStyle;
  pronunciation: null;
  category: "territories" | "languages" | "treaties";
  official_websites: null;
  created_at: Date;
  last_modified_at: Date;
  related: null;
  sources: string[];
  changelog: FeatureChange[];
}

// date and string pair describing content changes made by admin to individual <Feature> pages
interface FeatureChange {
  changeText: string; // sentence describing change
  changeDate: string;
}

// anchorLinkText and URL pairs for individual <Feature> pages, linking to outside web content
interface FeatureOfficialWebsite {
  webSiteTitle: string; // the descriptive text within the <a> tag
  webSiteUrl: string;
}

// object describing polygon style properties in MapBox
// creates consistency between <FrontPageMap> and <Feature>
interface FeaturePolygonStyle {
  color: string; // HTML hex color
}
