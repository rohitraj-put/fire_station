import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Printer } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function Reports() {
  const reportTypes = [
    {
      title: "Incident Summary Report",
      description: "Overview of all incidents and response times",
      icon: FileText
    },
    {
      title: "Equipment Status Report",
      description: "Current status and maintenance history of all equipment",
      icon: FileText
    },
    {
      title: "Personnel Roster Report",
      description: "Complete staff listing with certifications and schedules",
      icon: FileText
    },
    {
      title: "Training Compliance Report",
      description: "Training completion status and upcoming requirements",
      icon: FileText
    }
  ];

  return (
    <MainLayout>
      <Helmet>
        <title>Reports | Fire Rescue Command Center</title>
      </Helmet>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reportTypes.map((report) => (
            <Card key={report.title} className="hover:bg-accent/50 cursor-pointer transition-colors">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <CardTitle className="text-base font-medium">{report.title}</CardTitle>
                <report.icon className="h-4 w-4 ml-auto" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{report.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
