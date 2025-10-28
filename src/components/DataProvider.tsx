import { createContext, useState, ReactNode, useEffect } from "react";

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

interface DataContextType {
  data: {
    role: string | null;
    feedback: any | null;
    jobs: Job[];
  };
  setData: React.Dispatch<
    React.SetStateAction<{ role: string | null; feedback: any | null; jobs: Job[] }>
  >;
}

export const DataContext = createContext<DataContextType>({
  data: { role: null, feedback: null, jobs: [] },
  setData: () => {},
});

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<{ role: string | null; feedback: any | null; jobs: Job[] }>({
    role: null,
    feedback: null,
    jobs: [],
  });

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/find-job", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ skills: ["React", "JavaScript"] }),
        });
        const json = await res.json();
        setData((prev) => ({ ...prev, jobs: json.jobs || [] }));
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    }

    fetchJobs();
  }, []);

  return <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>;
};
