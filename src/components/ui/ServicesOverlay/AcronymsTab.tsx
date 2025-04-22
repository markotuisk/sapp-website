
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AcronymDialog from "@/components/resources/AcronymDialog";

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
          .select("*");
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

  const grouped: Record<string, Acronym[]> = {};
  filtered
    .sort((a, b) => a.acronym.localeCompare(b.acronym))
    .forEach((acronym) => {
      if (!grouped[acronym.category]) grouped[acronym.category] = [];
      grouped[acronym.category].push(acronym);
    });

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
    <div className="max-w-3xl mx-auto">
      <div className="p-4 md:p-0">
        <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded p-3 text-sm mb-4">
          <strong>Info:</strong> All acronyms in our site are explained here, or when you hover/tap on them in content.
        </div>
        <div className="mb-4 flex items-center">
          <Search className="w-5 h-5 mr-2 text-sapp-gray" />
          <input
            className="w-full border border-sapp-gray/30 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sapp-blue bg-white"
            placeholder="Search acronym or phrase..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {filtered.length === 0 && (
          <div className="text-center text-gray-400 py-12">No acronyms match your search.</div>
        )}

        <div>
          {Object.keys(grouped).sort().map((cat) => (
            <div key={cat} className="mb-7">
              <div className="border-l-4 border-sapp-blue pl-3 mb-2">
                <span className="font-semibold text-lg text-sapp-blue">{cat}</span>
              </div>
              <table className="w-full table-auto mb-3 text-left">
                <thead>
                  <tr className="text-xs text-sapp-gray uppercase">
                    <th className="py-1 pr-2">Acronym</th>
                    <th className="py-1 pr-2">Definition</th>
                  </tr>
                </thead>
                <tbody>
                  {grouped[cat].map((a) => (
                    <tr
                      key={a.id}
                      className="group cursor-pointer hover:bg-slate-100 transition"
                      onClick={() => {
                        setSelected(a);
                        setDialogOpen(true);
                      }}
                    >
                      <td className="text-sapp-dark font-medium pr-2">{a.acronym}</td>
                      <td className="truncate max-w-xs text-sapp-gray group-hover:underline">{a.full_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
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
