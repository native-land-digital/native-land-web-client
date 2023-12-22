import FeatureSectionHeader from "./FeatureSectionHeader";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

export default function WebsitesList({
  official_websites,
  xPadding,
}: {
  official_websites: FeatureOfficialWebsite[];
  xPadding: string;
}) {
  const links = official_websites.map((website, index) => (
    <Link
      color="grey.400"
      display="block"
      href={website.webSiteUrl}
      key={index}
      target="_blank"
      rel="noreferrer"
      underline="none"
      aria-label="External website related to this geographic feature"
      sx={{
        width: "max-content",
      }}
    >
      {/* sometimes the anchor text is missing in the database, the old WordPress version of Native Land defaulted to the URL in these cases */}
      {website.webSiteTitle ? website.webSiteTitle : website.webSiteUrl}
    </Link>
  ));

  return (
    <>
      <FeatureSectionHeader text="Official Websites" xPadding={xPadding} />
      <Box
        sx={{
          p: 0,
          mt: 2,
          mx: xPadding,
          width: "max-content",
        }}
      >
        {links}
      </Box>
    </>
  );
}
