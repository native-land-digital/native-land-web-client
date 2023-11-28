import { LoaderFunctionArgs } from "react-router-dom";

export async function getFeature(slug: string | undefined) {
  const response = await fetch(`/api/feature/${slug}`); // fetch individual feature JSON from server API
  const feature = await response.json();
  return feature.data;
}

// features loader for React Router routes
// used for routes at /features
export async function loader({ params }: LoaderFunctionArgs) {
  const feature = await getFeature(params.slug);
  return { feature };
}
