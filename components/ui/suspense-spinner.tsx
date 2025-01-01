import { Loader2 } from "lucide-react";

export default function SuspenseSpinner() {
  return (
    <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
  );
}
