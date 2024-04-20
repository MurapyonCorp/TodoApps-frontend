import { DoneArea } from "@/components/DoneArea";
import { IncompleteArea } from "@/components/IncompleteArea";

export default function Home() {
  return (
    <div className="grid grid-cols-4 my-20">
      <div className="col-start-2 col-span-2 space-y-20">
        <IncompleteArea />
        <DoneArea />
      </div>
    </div>
  );
}
