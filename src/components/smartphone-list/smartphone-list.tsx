import "./smartphone-list.css";
import { SmarthponeCard } from "../smartphone-card/smartphone-card";

export function SmartphoneList() {
  return (
    <div className="smartphone-list">
      <SmarthponeCard />
      <SmarthponeCard />
      <SmarthponeCard />
      <SmarthponeCard />
      <SmarthponeCard />
    </div>
  );
}
