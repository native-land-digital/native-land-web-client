/// <reference types="vite/client" />

// features returned as JSON from API request to server
// eg. http://native-land.ca/features/oceti-sakowin-sioux
interface NativeLandFeature {
  name: string;
  polygon: Feature;
  polygon_style: FeaturePolygonStyle;
  pronunciation: null;
  category: featureCategory;
  created_at: string;
  last_modified_at: string;
  wordpress_created_at: string;
  wordpress_last_modified_at: string;
  related: null;
  sources: string[];
  changelog: FeatureChange[];
  official_websites: FeatureOfficialWebsite[];
}

type featureCategory = "territories" | "languages" | "treaties";

type infoChipType = "category" | "createdAt" | "lastModified";

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
