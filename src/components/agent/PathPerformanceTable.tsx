import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PathData {
  icon: string;
  path: string;
  leads: number;
  completionRate: string;
  avgScore: string;
  topSource: string;
}

interface PathPerformanceTableProps {
  data: PathData[];
}

const PathPerformanceTable = ({ data }: PathPerformanceTableProps) => {
  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/50">
            <TableHead>Path</TableHead>
            <TableHead className="text-center">Leads</TableHead>
            <TableHead className="text-center">Completion Rate</TableHead>
            <TableHead className="text-center">Avg Score</TableHead>
            <TableHead>Top Source</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <span className="mr-2">{row.icon}</span>
                {row.path}
              </TableCell>
              <TableCell className="text-center">{row.leads}</TableCell>
              <TableCell className="text-center">{row.completionRate}</TableCell>
              <TableCell className="text-center">{row.avgScore}</TableCell>
              <TableCell>{row.topSource}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PathPerformanceTable;
