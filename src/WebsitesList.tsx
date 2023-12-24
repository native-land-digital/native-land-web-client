import FeatureSectionHeader from "./FeatureSectionHeader";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "@mui/material/Link";

export default function WebsitesList({
  official_websites,
  xPadding,
}: {
  official_websites: FeatureOfficialWebsite[];
  xPadding: number;
}) {
  const links = official_websites.map((website, index) => (
    <ListItem>
      <Link
        color="grey.400"
        display="block"
        href={website.webSiteUrl}
        key={index}
        target="_blank"
        rel="noreferrer"
        underline="hover"
        aria-label="External website related to this geographic feature"
        sx={{
          fontSize: "1.2rem",
          width: "max-content",
          "&:hover": {
            color: (theme) => theme.palette.grey[200],
          },
        }}
      >
        {/* sometimes the anchor text is missing in the database, the old WordPress version of Native Land defaulted to the URL in these cases */}
        {website.webSiteTitle ? website.webSiteTitle : website.webSiteUrl}
      </Link>
    </ListItem>
  ));

  return (
    <>
      <FeatureSectionHeader text="Official Websites" xPadding={xPadding} />
      <List
        sx={{
          mt: 2,
          mb: 4,
          mx: { xs: 0, md: xPadding * 2 + "rem" },
          pl: { xs: xPadding * 2 + "rem", md: 0 },
          width: { xs: "100%", md: "max-content" },
          listStyleType: "disc",
          "& .MuiListItem-root": {
            display: "list-item",
            paddingLeft: "0.5rem",
          },
          "& .MuiListItem-root a": {
            width: "100%",
          },
          "& .MuiListItem-root::marker": {
            color: (theme) => theme.palette.grey[400],
          },
        }}
        disablePadding
      >
        {links}
      </List>
    </>
  );
}
