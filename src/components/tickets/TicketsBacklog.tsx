
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, Clock } from 'lucide-react';

const TicketsBacklog = () => {
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ['tickets', 'backlog'],
    queryFn: async () => {
      const { data: tickets } = await supabase
        .rpc('get_all_tickets')
        .neq('state', 'completed')
        .order('created_at', { ascending: false });
      return tickets || [];
    },
  });

  if (isLoading) {
    return <div>Loading tickets...</div>;
  }

  // Function to calculate days since creation
  const getDaysSinceCreation = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issue Backlog</CardTitle>
        <CardDescription>Active issues and feature requests</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Reporter</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Age</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{ticket.title}</TableCell>
                <TableCell>{ticket.reporter_name}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset">
                    {ticket.state}
                  </span>
                </TableCell>
                <TableCell>{ticket.category}</TableCell>
                <TableCell className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {getDaysSinceCreation(ticket.created_at)} days
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TicketsBacklog;
