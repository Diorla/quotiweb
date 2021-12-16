import Activity, { repeatType } from "interfaces/Activity";

export default function Recurrence({
  repeat,
  repeatCount,
}: {
  repeat: repeatType;
  repeatCount: number;
}) {
  if (repeat === "activity" || repeat === "category") return null;
  if (repeatCount === 1) return <div>Every {repeat}</div>;
  return (
    <div>
      Every {repeatCount} {repeat}
    </div>
  );
}
