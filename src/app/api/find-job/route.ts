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

    const searchQueries = skills.map((s) => s.trim()).filter(Boolean);
    console.log(`🔍 Performing sequential searches for ${searchQueries.length} skills`);

    const jobsMap = new Map();

    // 🧠 Sequentially search for each skill
    for (const skill of searchQueries) {
      console.log(`🔎 Searching for jobs with skill: ${skill}`);

      try {
        const response = await fetch(
          `https://jsearch.p.rapidapi.com/search?${new URLSearchParams({
            query: skill,
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
        );

        const result = await response.json();

        console.log(`🧾 ${result.data?.length || 0} results found for "${skill}"`);

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
      } catch (err) {
        console.error(`❌ Search failed for skill "${skill}"`, err);
      }
    }

    const jobs = Array.from(jobsMap.values()).slice(0, limit);

    console.log(`✅ Found ${jobs.length} unique jobs total from ${searchQueries.length} sequential searches`);

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
