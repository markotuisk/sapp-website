
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Clock, User, Tag, Calendar, CheckCircle2, RotateCcw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Tables } from "@/integrations/supabase/types";

type Ticket = Tables<'tickets'>;

const CompletedTickets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const { data: tickets, isLoading, refetch } = useQuery({
    queryKey: ['completed-tickets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .not('completed_at', 'is', null)
        .order('completed_at', { ascending: false });
      
      if (error) throw error;
      return data as Ticket[];
    },
  });

  const reopenTicket = async (ticketId: string) => {
    try {
      const { error } = await supabase
        .from('tickets')
        .update({ completed_at: null })
        .eq('id', ticketId);

      if (error) throw error;
      refetch();
    } catch (error) {
      console.error('Error reopening ticket:', error);
    }
  };

  const filteredTickets = tickets?.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || ticket.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  }) || [];

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading completed tickets...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search completed tickets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:max-w-sm"
        />
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="md:max-w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="bug">Bug</SelectItem>
            <SelectItem value="feature">Feature</SelectItem>
            <SelectItem value="improvement">Improvement</SelectItem>
            <SelectItem value="documentation">Documentation</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tickets Grid */}
      <div className="grid gap-4">
        {filteredTickets.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <p className="text-gray-500">No completed tickets found.</p>
            </CardContent>
          </Card>
        ) : (
          filteredTickets.map((ticket) => (
            <Card key={ticket.id} className="hover:shadow-md transition-shadow border-green-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg text-green-700">
                      <CheckCircle2 className="h-5 w-5 inline mr-2" />
                      #{ticket.ticket_number} - {ticket.title}
                    </CardTitle>
                    <CardDescription>{ticket.description}</CardDescription>
                  </div>
                  <Badge variant="outline" className="border-green-500 text-green-700">
                    {ticket.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {ticket.reporter_name}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Created: {formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true })}
                    </div>
                    {ticket.completed_at && (
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        Completed: {formatDistanceToNow(new Date(ticket.completed_at), { addSuffix: true })}
                      </div>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => reopenTicket(ticket.id)}
                    className="ml-auto"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reopen
                  </Button>
                </div>
                
                {ticket.developer_notes && (
                  <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                    <strong>Developer Notes:</strong> {ticket.developer_notes}
                  </div>
                )}
                
                {ticket.tags && ticket.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {ticket.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CompletedTickets;
