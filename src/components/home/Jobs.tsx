"use client";

import React, { useContext, useMemo, useState, useEffect } from "react";
import { BriefcaseIcon, ExternalLinkIcon, MapPinIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataContext } from "../DataProvider";

type Checked = boolean;

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string | null;
  location: string;
  salary: string;
  tags?: string[];
  description: string;
  employmentType: string;
  applyUrl: string;
  postedDate: string | null;
  isRemote: boolean;
}

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
        {locations.map((loc) => (
          <DropdownMenuCheckboxItem
            key={loc}
            checked={selected === loc}
            onCheckedChange={(val) => onChange(val ? loc : "all")}
          >
            {loc === "all" ? "All locations" : loc}
          </DropdownMenuCheckboxItem>
        ))}
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
  
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter by tags</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {tags.map((t) => (
          <DropdownMenuCheckboxItem
            key={t}
            checked={selected.includes(t)}
            onCheckedChange={(val) => {
              if (val) onChange([...selected, t]);
              else onChange(selected.filter((s) => s !== t));
            }}
          >
            {t}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Jobs() {
  const { data } = useContext(DataContext);

  // Ensure jobs is always an array
  const jobs: Job[] = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data.jobs)) return data.jobs;
    return [];
  }, [data]);

  const [page, setPage] = useState(1);
  const pageSize = 6;

  // filters
  const [query, setQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [tagFilters, setTagFilters] = useState<string[]>([]);

  // derive unique locations
  const locations = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => j.location && set.add(j.location));
    return ["all", ...Array.from(set)];
  }, [jobs]);

  // derive unique tags
  const tags = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => j.tags?.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [jobs]);

  // filter logic
  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((job) => {
      if (locationFilter !== "all" && job.location !== locationFilter)
        return false;
      if (tagFilters.length > 0 && !job.tags?.some((t) => tagFilters.includes(t)))
        return false;
      if (!q) return true;

      const inTitle = job.title.toLowerCase().includes(q);
      const inCompany = job.company.toLowerCase().includes(q);
      const inTags = job.tags?.some((t) => t.toLowerCase().includes(q)) || false;

      return inTitle || inCompany || inTags;
    });
  }, [jobs, query, locationFilter, tagFilters]);

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

  // reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [query, locationFilter, tagFilters]);

  useEffect(() => {
    console.log("Jobs data:", jobs);
  }, [jobs]);

  return (
    <section className="relative w-full py-12">
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

          <DropdownLocations
            locations={locations}
            selected={locationFilter}
            onChange={setLocationFilter}
          />

          <DropdownTags
            tags={tags}
            selected={tagFilters}
            onChange={setTagFilters}
          />

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
              className="bg-white/60 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              {/* Content */}
              <div className="flex flex-col gap-2">
                {/* Company Name */}
                <div className="text-left text-sm font-light text-muted-foreground">
                  {job.company}
                </div>

                {/* Job Title */}
                <h4 className="text-left text-lg font-bold">{job.title}</h4>

                {/* Location */}
                <div className="text-left text-xs text-muted-foreground flex items-center gap-1">
                  <MapPinIcon className="w-3 h-3" />
                  {job.location}
                </div>

                {/* Salary */}
                <div className="text-left text-sm font-medium mt-1">{job.salary}</div>

                {/* Tags */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {job.tags?.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-muted/40 dark:bg-muted/20 px-2 py-1 rounded-full text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <div className="mt-4 flex justify-start">
                <a
                  className="text-sm inline-flex items-center gap-2 px-2 py-1.5 rounded-lg bg-foreground text-background hover:opacity-90"
                  href={job.applyUrl}
                  target="_blank"
                >
                  <ExternalLinkIcon className="w-4 h-4" />
                  Apply
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
            className="px-3 py-1 rounded-md bg-muted/20 text-sm disabled:opacity-50 transition-all duration-200 hover:bg-muted/30"
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
                  className={`min-w-[36px] px-2 py-1 rounded-md text-sm transition-all duration-200 ${
                    active
                      ? "bg-foreground text-background font-semibold scale-105"
                      : "bg-transparent text-muted-foreground hover:bg-muted/10 hover:scale-105"
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
            className="px-3 py-1 rounded-md bg-muted/20 text-sm disabled:opacity-50 transition-all duration-200 hover:bg-muted/30"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
