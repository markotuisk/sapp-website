import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Clock, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  const getDaysToCompletion = (createdAt: string, completedAt: string | null) => {
    if (!completedAt) return 0;
    
    const created = new Date(createdAt);
    const completed = new Date(completedAt);
    const diffTime = Math.abs(completed.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTicketId = (ticket: any) => {
    const year = new Date(ticket.created_at).getFullYear();
    return `WEB-${year}-${String(ticket.ticket_number).padStart(3, '0')}`;
  };

  if (isLoading) {
    return <div>Loading completed tickets...</div>;
  }

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
              <TableHead>Ticket</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date Received</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Resolution Time</TableHead>
              <TableHead className="w-[30px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{formatTicketId(ticket)}</TableCell>
                <TableCell>{ticket.title}</TableCell>
                <TableCell>{formatDate(ticket.created_at)}</TableCell>
                <TableCell>{ticket.category}</TableCell>
                <TableCell className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {getDaysToCompletion(ticket.created_at, ticket.completed_at)} days
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[300px]">
                        <p className="font-semibold mb-1">Reporter: {ticket.reporter_name}</p>
                        <p className="text-sm mb-2">Feedback: {ticket.description}</p>
                        {ticket.developer_notes && (
                          <p className="text-sm text-gray-500">
                            Dev Notes: {ticket.developer_notes}
                          </p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
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
