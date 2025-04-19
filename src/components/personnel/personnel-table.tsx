import { Personnel } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface PersonnelTableProps {
  personnel: Personnel[];
}

export function PersonnelTable({ personnel }: PersonnelTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Badge</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Contact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {personnel.map((person) => (
            <TableRow key={person.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={person.imageUrl} />
                    <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{person.name}</span>
                </div>
              </TableCell>
              <TableCell>{person.position}</TableCell>
              <TableCell>{person.badge}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {person.status.replace("-", " ")}
                </Badge>
              </TableCell>
              <TableCell>{person.team}</TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>{person.contact.email}</div>
                  <div className="text-muted-foreground">{person.contact.phone}</div>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {personnel.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                No personnel found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
