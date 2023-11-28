export async function getFeature(slug: string) {
  const response = await fetch(`/api/feature/${slug}`);
  const message = await response.json();
  return message;
}

export async function loader({ params }) {
  const feature = await getFeature(params.slug);
  return { feature };
}
