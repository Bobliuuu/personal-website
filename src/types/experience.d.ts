export type ExperienceItem = {
    title: string
    company: string
    location: string
    date: string[] | string
    logo: string
    points: string[]
    description?: string // Brief summary text shown when collapsed
    tags?: string[]
    images?: string[]
  }
  
  