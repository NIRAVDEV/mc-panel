import AICodeGenerator from "@/components/dashboard/AICodeGenerator";
import ConfigurationManager from "@/components/dashboard/ConfigurationManager";
import GitIntegration from "@/components/dashboard/GitIntegration";

export default function Home() {
  return (
    <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <AICodeGenerator />
      </div>
      <div className="space-y-8">
        <ConfigurationManager />
        <GitIntegration />
      </div>
    </div>
  );
}
