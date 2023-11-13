import { useLocation } from "react-router-dom";

export default function Feature() {
  const {
    state: { feature },
  } = useLocation();

  return (
    <>
      Feature Data:
      <ul>
        <li>{feature.name}</li>
        <li>{feature.slug}</li>
        <li>{feature.id}</li>
      </ul>
    </>
  );
}
