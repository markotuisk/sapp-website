
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, Clock } from 'lucide-react';

const CompletedTickets = () => {
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ['tickets', 'completed'],
    queryFn: async () => {
      const { data: tickets } = await supabase
        .rpc('get_all_tickets')
        .eq('state', 'completed')
        .order('completed_at', { ascending: false });
      return tickets || [];
    },
  });

  if (isLoading) {
    return <div>Loading completed tickets...</div>;
  }

  // Function to calculate days to resolution
  const getDaysToCompletion = (createdAt: string, completedAt: string | null) => {
    if (!completedAt) return 0;
    
    const created = new Date(createdAt);
    const completed = new Date(completedAt);
    const diffTime = Math.abs(completed.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Completed Issues</CardTitle>
        <CardDescription>Successfully resolved issues and implemented features</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Reporter</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Time to Resolution</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{ticket.title}</TableCell>
                <TableCell>{ticket.reporter_name}</TableCell>
                <TableCell>{ticket.category}</TableCell>
                <TableCell className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {getDaysToCompletion(ticket.created_at, ticket.completed_at)} days
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CompletedTickets;
