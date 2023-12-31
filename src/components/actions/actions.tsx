import Submit from "./submit";
import Undo from "./undo";

export default function Actions() {
  return (
    <div className="flex gap-x-2">
      <Undo />
      <Submit />
    </div>
  );
}
