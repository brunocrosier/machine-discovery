import { NameNumberForm } from "./NameNumberForm/NameNumberForm";
import { Toaster } from "@/components/ui/toaster";
import { Switch } from "@/components/ui/switch";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Label } from "./components/ui/label";
import Background from "@/assets/background.jpg";
import MachineDiscoveryLogo from "@/assets/logo.svg?react";

function App() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col min-h-screen items-center"
      style={{
        backgroundImage: `url('${Background}')`,
      }}
    >
      <main className="w-1/2 my-10 flex flex-col gap-4">
        <Link to="/" className="flex justify-center">
          <MachineDiscoveryLogo
            aria-label="Machine Discovery logo"
            style={{ width: "60%" }}
          />
        </Link>
        <NameNumberForm />
        <div className="flex gap-4 items-center absolute bottom-4 left-4 border-2 border-inherit px-6 py-4 rounded bg-slate-50">
          <div className="flex flex-col gap-2 w-64">
            <Label>Import data from JSON file?</Label>
            <p className="text-sm text-muted-foreground">
              If enabled, the default form data will come from{" "}
              <code>default-values.json</code>
            </p>
          </div>
          <Switch
            checked={searchParams.get("mode") === "json-import"}
            onCheckedChange={() =>
              navigate(
                searchParams.get("mode") === "json-import"
                  ? "?mode=local"
                  : "?mode=json-import"
              )
            }
          />
        </div>
      </main>
      <Toaster />
    </div>
  );
}

export default App;
