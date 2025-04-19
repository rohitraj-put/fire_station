import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, Bell, Shield, Users, Database } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function Settings() {
  const settingSections = [
    {
      title: "General Settings",
      description: "Configure basic application settings",
      icon: SettingsIcon,
      items: ["Station Information", "Regional Settings", "Language & Time Zone"]
    },
    {
      title: "Notifications",
      description: "Manage alert preferences and channels",
      icon: Bell,
      items: ["Alert Settings", "Email Notifications", "Mobile Notifications"]
    },
    {
      title: "Security",
      description: "Control access and permissions",
      icon: Shield,
      items: ["User Permissions", "Authentication", "Security Logs"]
    },
    {
      title: "User Management",
      description: "Manage user accounts and roles",
      icon: Users,
      items: ["User Accounts", "Role Management", "Access Control"]
    },
    {
      title: "Data Management",
      description: "Backup and data settings",
      icon: Database,
      items: ["Backup Settings", "Data Retention", "Import/Export"]
    }
  ];

  return (
    <MainLayout>
      <Helmet>
        <title>Settings | Fire Rescue Command Center</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        </div>

        <div className="space-y-6">
          {settingSections.map((section) => (
            <Card key={section.title}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <section.icon className="h-5 w-5" />
                  <div>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {section.items.map((item, index) => (
                    <div key={item}>
                      {index > 0 && <Separator className="my-2" />}
                      <div className="flex justify-between items-center">
                        <span>{item}</span>
                        <Button variant="ghost" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}