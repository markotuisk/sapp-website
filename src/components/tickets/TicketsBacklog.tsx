import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  const getDaysSinceCreation = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
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
    return <div>Loading tickets...</div>;
  }

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
              <TableHead>Ticket</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date Received</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Age</TableHead>
              <TableHead className="w-[30px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{formatTicketId(ticket)}</TableCell>
                <TableCell>{ticket.title}</TableCell>
                <TableCell>{formatDate(ticket.created_at)}</TableCell>
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

export default TicketsBacklog;
