import { NextRequest, NextResponse } from "next/server";

interface JobSearchRequest {
  skills: string[];
  limit?: number;
}

export async function POST(request: Request) {
  try {
    const { skills, limit = 50 }: JobSearchRequest = await request.json();

    if (!skills || skills.length === 0) {
      return NextResponse.json(
        { error: "Skills are required", jobs: [] },
        { status: 400 }
      );
    }

    console.log(`Performing multiple searches for ${skills.length} skills`);

    // Create multiple search queries with different skill combinations
    const searchQueries: string[] = [];

    // Query 1: Top 3 skills
    if (skills.length >= 3) {
      searchQueries.push(skills.slice(0, 3).join(" "));
    }

    // Query 2: Skills 3-6
    if (skills.length >= 6) {
      searchQueries.push(skills.slice(3, 6).join(" "));
    }

    // Query 3: Just the most important skill
    if (skills.length >= 1) {
      searchQueries.push(skills[0]);
    }

    // If we have few skills, just use them
    if (searchQueries.length === 0) {
      searchQueries.push(skills.join(" "));
    }

    console.log("Search queries:", searchQueries);

    // Perform all searches in parallel
    const searchPromises = searchQueries.map((query) =>
      fetch(
        `https://jsearch.p.rapidapi.com/search?${new URLSearchParams({
          query,
          page: "1",
          num_pages: "1",
          date_posted: "all",
        })}`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
          },
        }
      )
        .then((res) => res.json())
        .catch((err) => {
          console.error("Search failed for query:", query, err);
          return { data: [] };
        })
    );

    const results = await Promise.all(searchPromises);

    // Deduplicate jobs by ID
    const jobsMap = new Map();

    results.forEach((result) => {
      result.data?.forEach((job: any) => {
        if (!jobsMap.has(job.job_id)) {
          jobsMap.set(job.job_id, {
            id: job.job_id,
            title: job.job_title,
            company: job.employer_name,
            companyLogo: job.employer_logo,
            location:
              job.job_city && job.job_country
                ? `${job.job_city}, ${job.job_country}`
                : job.job_country || "Remote",
            description:
              job.job_description?.substring(0, 300) + "..." ||
              "No description available",
            salary:
              job.job_min_salary && job.job_max_salary
                ? `${
                    job.job_salary_currency || "$"
                  }${job.job_min_salary.toLocaleString()} - ${job.job_max_salary.toLocaleString()}`
                : job.job_min_salary
                ? `${
                    job.job_salary_currency || "$"
                  }${job.job_min_salary.toLocaleString()}+`
                : "Not specified",
            employmentType: job.job_employment_type || "Not specified",
            applyUrl: job.job_apply_link,
            postedDate: job.job_posted_at_datetime_utc,
            isRemote: job.job_is_remote || false,
          });
        }
      });
    });

    const jobs = Array.from(jobsMap.values()).slice(0, limit);

    console.log(
      `Found ${jobs.length} unique jobs from ${searchQueries.length} searches`
    );

    return NextResponse.json({
      jobs,
      total: jobs.length,
      searchQueries,
      allSkills: skills,
    });
  } catch (error: any) {
    console.error("Job Search Error:", error);
    return NextResponse.json(
      {
        error: error.message,
        jobs: [],
        total: 0,
      },
      { status: 500 }
    );
  }
}
