"use client";
import React, { useMemo, useState } from "react";
import { BriefcaseIcon, MapPinIcon, Search } from "lucide-react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

function DropdownLocations({
  locations,
  selected,
  onChange,
}: {
  locations: string[];
  selected: string;
  onChange: (next: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-sm px-3 py-2">
          {selected === "all" ? "All locations" : selected}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter by location</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {locations.map((loc) => {
          const checked: Checked = (selected === loc) as Checked;
          return (
            <DropdownMenuCheckboxItem
              key={loc}
              checked={checked}
              onCheckedChange={(val) => {
                const isChecked = Boolean(val);
                onChange(isChecked ? loc : "all");
              }}
            >
              {loc === "all" ? "All locations" : loc}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DropdownTags({
  tags,
  selected,
  onChange,
}: {
  tags: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-sm px-3 py-2">
          Tags {selected.length > 0 ? `(${selected.length})` : ""}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter by tags</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {tags.map((t) => {
          const checked: Checked = selected.includes(t) as Checked;
          return (
            <DropdownMenuCheckboxItem
              key={t}
              checked={checked}
              onCheckedChange={(val) => {
                const isChecked = Boolean(val);
                if (isChecked) onChange([...selected, t]);
                else onChange(selected.filter((s) => s !== t));
              }}
            >
              {t}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const jobs = [
	{
		id: 1,
		title: "Frontend Developer",
		company: "Acme Co.",
		location: "Remote",
		salary: "$70k - $95k",
		tags: ["React", "TypeScript", "Tailwind"],
	},
	{
		id: 2,
		title: "Product Designer",
		company: "Studio Nova",
		location: "London, UK",
		salary: "$60k - $85k",
		tags: ["Figma", "UX", "Prototyping"],
	},
	{
		id: 3,
		title: "Machine Learning Engineer",
		company: "DataWise",
		location: "San Francisco, CA",
		salary: "$120k - $150k",
		tags: ["Python", "PyTorch", "NLP"],
	},
	{
		id: 4,
		title: "Backend Engineer",
		company: "CloudShift",
		location: "Berlin, DE",
		salary: "$80k - $110k",
		tags: ["Node.js", "Postgres", "Kubernetes"],
	},
	{
		id: 5,
		title: "QA Engineer",
		company: "TestLab",
		location: "Remote",
		salary: "$50k - $75k",
		tags: ["Testing", "Automation"],
	},
	{
		id: 6,
		title: "Technical Writer",
		company: "DocsHub",
		location: "Toronto, CA",
		salary: "$55k - $70k",
		tags: ["Writing", "Markdown"],
	},
	{
		id: 7,
		title: "DevOps Engineer",
		company: "InfraWorks",
		location: "Remote",
		salary: "$95k - $130k",
		tags: ["AWS", "Kubernetes", "CI/CD"],
	},
	{
		id: 8,
		title: "Mobile Engineer",
		company: "AppHouse",
		location: "NYC, USA",
		salary: "$85k - $115k",
		tags: ["iOS", "Android", "React Native"],
	},
	{
		id: 9,
		title: "Data Analyst",
		company: "MetricsPro",
		location: "Austin, TX",
		salary: "$65k - $85k",
		tags: ["SQL", "Tableau", "Python"],
	},
	{
		id: 10,
		title: "Security Engineer",
		company: "SafeNet",
		location: "Remote",
		salary: "$110k - $140k",
		tags: ["Security", "Pentesting"],
	},
	{
		id: 11,
		title: "Cloud Architect",
		company: "Nimbus",
		location: "Berlin, DE",
		salary: "$130k - $160k",
		tags: ["Azure", "GCP", "Architecture"],
	},
	{
		id: 12,
		title: "Support Engineer",
		company: "HelpDesk",
		location: "Toronto, CA",
		salary: "$45k - $60k",
		tags: ["Support", "Customer Success"],
	},
];

export default function Jobs() {
    const [page, setPage] = useState(1);
    const pageSize = 6; // show 6 cards per page

    // search + filters
    const [query, setQuery] = useState("");
    const [locationFilter, setLocationFilter] = useState("all");
    // now allow multiple tag selections
    const [tagFilters, setTagFilters] = useState<string[]>([]);

    // derive unique locations and tags
    const locations = useMemo(() => {
        const set = new Set<string>();
        jobs.forEach((j) => set.add(j.location));
        return ["all", ...Array.from(set)];
    }, []);

    const tags = useMemo(() => {
        const set = new Set<string>();
        jobs.forEach((j) => j.tags.forEach((t) => set.add(t)));
        return Array.from(set);
    }, []);

    // filtered list based on search and filters
    const filteredJobs = useMemo(() => {
        const q = query.trim().toLowerCase();
        return jobs.filter((job) => {
            if (locationFilter !== "all" && job.location !== locationFilter) return false;
            if (tagFilters.length > 0 && !job.tags.some((t) => tagFilters.includes(t))) return false;
            if (!q) return true;
            const inTitle = job.title.toLowerCase().includes(q);
            const inCompany = job.company.toLowerCase().includes(q);
            const inTags = job.tags.some((t) => t.toLowerCase().includes(q));
            return inTitle || inCompany || inTags;
        });
    }, [query, locationFilter, tagFilters]);

    const totalPages = Math.max(1, Math.ceil(filteredJobs.length / pageSize));

    const pageJobs = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filteredJobs.slice(start, start + pageSize);
    }, [page, filteredJobs, pageSize]);

    function resetFilters() {
        setQuery("");
        setLocationFilter("all");
        setTagFilters([]);
        setPage(1);
    }

    // whenever filters/search change reset to first page
    React.useEffect(() => {
        setPage(1);
    }, [query, locationFilter, tagFilters]);

    return (
        <section className="relative w-full py-12">
            {/* background */}
            <div>
                <div/>
            </div>
            <div/>
            <div/>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold">Suggested jobs</h3>
                    <p className="text-sm text-muted-foreground">Hand-picked for you</p>
                </div>

                {/* Search + Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                    <label className="flex items-center gap-2 flex-1">
                        <span className="sr-only">Search jobs</span>
                        <div className="relative flex-1">
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900 text-sm placeholder:text-muted-foreground"
                                placeholder="Search by title, company or tag..."
                                aria-label="Search jobs"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                <Search className="w-4 h-4" />
                            </div>
                        </div>
                    </label>

                    {/* replaced select with DropdownLocations to match Tags */}
                    <DropdownLocations
                      locations={locations}
                      selected={locationFilter}
                      onChange={setLocationFilter}
                    />

                    {/* Tags dropdown (multi-select) */}
                    <DropdownTags tags={tags} selected={tagFilters} onChange={setTagFilters} />

                    <button
                        onClick={resetFilters}
                        className="ml-auto sm:ml-0 text-sm px-3 py-2 rounded-md bg-muted/10 hover:bg-muted/20"
                        aria-label="Reset filters"
                    >
                        Reset
                    </button>
                </div>

                {/* Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {pageJobs.length === 0 ? (
                        <div className="col-span-full text-center text-muted-foreground py-12">
                            No jobs found.
                        </div>
                    ) : (
                        pageJobs.map((job) => (
                            <article
                                key={job.id}
                                className="bg-white/60 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="text-lg font-semibold">{job.title}</h4>
                                        <div className="text-sm text-muted-foreground mt-1">
                                            {job.company}
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="text-sm font-medium">{job.salary}</div>
                                        <div className="text-xs text-muted-foreground mt-1 flex items-center justify-end gap-1">
                                            <MapPinIcon className="w-3 h-3" />
                                            {job.location}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {job.tags.map((t) => (
                                        <span
                                            key={t}
                                            className="text-xs bg-muted/40 dark:bg-muted/20 px-2 py-1 rounded-full text-muted-foreground"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <a
                                        className="text-sm inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-foreground text-background hover:opacity-90"
                                        href="#"
                                    >
                                        <BriefcaseIcon className="w-4 h-4" />
                                        View
                                    </a>

                                    <a
                                        className="text-sm text-muted-foreground hover:underline"
                                        href="#"
                                    >
                                        Save
                                    </a>
                                </div>
                            </article>
                        ))
                    )}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex items-center justify-center gap-3">
                    <button
                        aria-label="Previous page"
                        disabled={page <= 1}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="px-3 py-1 rounded-md bg-muted/20 text-sm disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <nav aria-label="Pagination" className="flex items-center gap-2">
                        {Array.from({ length: totalPages }).map((_, i) => {
                            const p = i + 1;
                            const active = p === page;
                            return (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    aria-current={active ? "page" : undefined}
                                    className={`min-w-[36px] px-2 py-1 rounded-md text-sm ${
										active
											? "bg-foreground text-background font-semibold"
											: "bg-transparent text-muted-foreground hover:bg-muted/10"
									}`}
                                >
                                    {p}
                                </button>
                            );
                        })}
                    </nav>

                    <button
                        aria-label="Next page"
                        disabled={page >= totalPages}
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        className="px-3 py-1 rounded-md bg-muted/20 text-sm disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
}