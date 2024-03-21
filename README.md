This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## ERD [WIP]
```mermaid
erDiagram
    AcademicYear{
        string Year
    }
    AcademicYear || -- |{ Semester: ConsistsOf

    Semester ||--|{ Program: ConsistsOf

    Semester {
        string  semester_name
        Program[] programs
    }

    Program {
        string academic_year
        string program_name
        string semester
        Instructor[] instructors
        Course[] courses
        
    }

    Admin {
        enum regular_admin
        enum super_admin
        string admin_id
        string admin_name
    }

    Instructor {
        string academic_year
        bool availability
        string first_name
        string last_name
        int maxCourse
        String[] preferred_time
        String[] preferred_days
        enum fulltime
        enum parttime
    }

    Program ||--|| Admin: Has
    Program ||--|{ Instructor: Has
    Program }|--|{ Course: ConsistOf

    Course {
        bool availability
        string register_code
        string course_id
        string course_name
    }

    Course }|--|{ Instructor: TaughtBy

    Classroom{
        string building_number
        string room_number
        int max_capacity
        string[] features
        string[] availability

    } 
    Classroom ||--o{ Section: OccupiedBy

    Section {
        string semester_name
        string course_name
        string instructor_name
        string room_number
        Time section_time

    }
    Course||--|{ Section: ConsistsOf 

    Instructor ||--o{ Section: GeneratedByAlgo

```
