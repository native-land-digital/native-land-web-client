export default function MapLegend({
  selectedFeatures,
}: {
  selectedFeatures: string[] | [];
}) {
  const featuresList = selectedFeatures.map((feature, index) => (
    <li key={index}>
      <a href={`/features/${feature}`}>{feature}</a>
    </li>
  ));

  const style =
    selectedFeatures.length > 0
      ? "absolute top-10 left-10 bg-white p-12"
      : "hidden";

  return (
    <div className={style}>
      <ul>{featuresList}</ul>
    </div>
  );
}
