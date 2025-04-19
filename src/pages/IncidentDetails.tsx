import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/main-layout";
import { useFireStation } from "@/context/FireStationContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { MapPin, Clock, Users, Truck, MessageSquare, PenTool } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function IncidentDetails() {
  const { id } = useParams();
  const { getIncidentById } = useFireStation();
  const incident = getIncidentById(id || "");

  if (!incident) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-muted-foreground">Data Loading.... Please Wait</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Helmet>
        <title>Incident Details | Fire Rescue Command Center</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Incident Details</h1>
          <StatusBadge status={incident.status} />
        </div>

        <div className="space-y-6">
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{incident.location.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Timeline</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Reported: {new Date(incident.reportedAt).toLocaleString()}</p>
                      {incident.dispatchedAt && (
                        <p>Dispatched: {new Date(incident.dispatchedAt).toLocaleString()}</p>
                      )}
                      {incident.arrivedAt && (
                        <p>Arrived: {new Date(incident.arrivedAt).toLocaleString()}</p>
                      )}
                      {incident.resolvedAt && (
                        <p>Resolved: {new Date(incident.resolvedAt).toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assigned Units</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <Users className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Personnel</p>
                    <p className="text-sm text-muted-foreground">
                      {incident.assignedUnits.personnel.length > 0
                        ? incident.assignedUnits.personnel.join(", ")
                        : "No personnel assigned"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Truck className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Vehicles</p>
                    <p className="text-sm text-muted-foreground">
                      {incident.assignedUnits.vehicles.length > 0
                        ? incident.assignedUnits.vehicles.join(", ")
                        : "No vehicles assigned"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <PenTool className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Equipment</p>
                    <p className="text-sm text-muted-foreground">
                      {incident.assignedUnits.equipment.length > 0
                        ? incident.assignedUnits.equipment.join(", ")
                        : "No equipment assigned"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            
          </div>
          <Card className="w-full">
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium">Description</p>
                  <p className="text-sm text-muted-foreground">{incident.description} A fire incident report is a detailed account of a fire incident, including the time, location, cause, extent of damage, and actions taken by the fire department. It's crucial for understanding the incident, preventing future occurrences, and assisting with insurance claims and legal matters. The report should document the events chronologically, including the initial size-up, actions taken, and any unusual circumstances encountered.
                    Here's a breakdown of what typically goes into a fire incident report:
                    1. Administrative Information:
                    Report Number: A unique identifier for the report.
                    Date and Time of Incident: The exact date and time the fire was discovered.
                    Incident Type: Clearly state whether it was a fire, rescue, medical emergency, or other type of incident.
                    Location: Precise address, including apartment number or specific location within the building, if applicable.
                    Report Writer's Information: Name, title, and contact information of the person preparing the report.
                    2. Incident Description:
                    Initial Report/Size-up:
                    Document the initial radio report, including what was observed on arrival.
                    Cause of Fire:
                    Determine the suspected cause, including factors like electrical, flammable materials, or arson.
                    Extent of Damage:
                    Detail the damage to property, including structures, contents, and any property that is affected.
                    Personnel Involved:
                    List all responding units, including fire department personnel and any other agencies.
                    Actions Taken:
                    Document the sequence of events, including the initial orders given, and any significant actions taken by firefighters.
                    Unusual Circumstances:
                    Note any unusual conditions, such as excessive locks, obstacles, or difficult access.
                    Witnesses:
                    Include any witness statements or information gathered during the investigation.
                    Attachments:
                    Photographs, videos, and other relevant documents should be included.
                    3. Additional Information:
                    Injuries/Casualties: Record any injuries or fatalities resulting from the fire.
                    Property Damage: Detail the extent of damage to property and contents.
                    Value of Property: Include an estimate of the value of damaged property.
                    Insurance Information: Include any relevant information about insurance claims.
                    Actions of Outside Agencies: Document any actions taken by other authorities like police, utility companies, or coroner.
                    Fire Alarm/Sprinkler Systems: Note if fire alarms or sprinkler systems were active and whether they were effective.
                    4. Post-Incident:
                    Follow-up: Document any follow-up investigations or actions taken after the incident.
                    Lessons Learned: Identify any trends or lessons learned that could improve fire response procedures.
                    5. Reporting Systems:
                    National Fire Incident Reporting System (NFIRS): Many fire departments utilize NFIRS for standardized reporting.
                    Software Solutions: Fire incident reporting software can streamline the process and provide valuable data analysis. </p>
                </div>
                {incident.notes && incident.notes.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">Notes</p>
                    </div>
                    <ul className="space-y-2">
                      {incident.notes.map((note, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
        </div>
      </div>
    </MainLayout>
  );
}