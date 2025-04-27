
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AcronymDialog from "@/components/resources/AcronymDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Acronym {
  id: string;
  acronym: string;
  full_name: string;
  description: string;
  category: string;
}

const AcronymsTab = () => {
  const [acronyms, setAcronyms] = useState<Acronym[]>([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Acronym[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<Acronym | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAcronyms = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from("technical_acronyms")
          .select("*")
          .order("acronym");
        if (fetchError) throw new Error(fetchError.message);
        setAcronyms(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load acronyms");
      } finally {
        setLoading(false);
      }
    };
    fetchAcronyms();
  }, []);

  useEffect(() => {
    if (!search) {
      setFiltered(acronyms);
    } else {
      const s = search.toLowerCase();
      setFiltered(
        acronyms.filter(
          (a) =>
            a.acronym.toLowerCase().includes(s) ||
            a.full_name.toLowerCase().includes(s) ||
            a.description.toLowerCase().includes(s) ||
            a.category.toLowerCase().includes(s)
        )
      );
    }
  }, [search, acronyms]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sapp-blue"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 py-4">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="p-4 space-y-4">
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-sapp-dark">Technical Acronyms Database</h2>
          <p className="text-sm text-muted-foreground">
            Search and explore technical acronyms used throughout our documentation and services.
          </p>
        </div>

        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              className="w-full pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sapp-blue bg-white"
              placeholder="Search acronyms, definitions, or categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </Card>

        {filtered.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No acronyms match your search criteria.
          </div>
        ) : (
          <div className="bg-white rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Acronym</TableHead>
                  <TableHead>Definition</TableHead>
                  <TableHead className="w-[120px]">Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((acronym) => (
                  <TableRow
                    key={acronym.id}
                    className="cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={() => {
                      setSelected(acronym);
                      setDialogOpen(true);
                    }}
                  >
                    <TableCell className="font-medium text-sapp-blue">
                      {acronym.acronym}
                    </TableCell>
                    <TableCell>{acronym.full_name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-normal">
                        {acronym.category}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <AcronymDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        acronym={selected}
      />
    </div>
  );
};

export default AcronymsTab;
