import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListSubheader from "@mui/material/ListSubheader";
import { grey } from "@mui/material/colors";

export default function WebsitesList({
  official_websites,
}: {
  official_websites: FeatureOfficialWebsite[];
}) {
  const links = official_websites.map((website) => (
    <ListItemButton
      component={"a"}
      href={website.webSiteUrl}
      // target="_blank"
      // rel="noreferrer"
      divider
    >
      <ListItemText>
        {/* sometimes the anchor text is missing in the database, the old WordPress version of Native Land defaulted to the URL in these cases */}
        {website.webSiteTitle ? website.webSiteTitle : website.webSiteUrl}
      </ListItemText>
    </ListItemButton>
  ));

  return (
    <List sx={{ bgcolor: grey[600], p: 0, mt: 2 }}>
      <ListSubheader
        sx={{ bgcolor: grey[500], color: "primary.contrastText", fontSize: 18 }}
        disableSticky
      >
        Official Websites
      </ListSubheader>
      {links}
    </List>
  );
}
