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
  
  export type EducationItem = {
  institution: string
  degree: string
  dates: string
  grade?: string
  logo: string
  activities?: string[]
  scholarships?: string[]
}
export type Publication = {
  title: string
  publisher: string
  date: string
  url: string
}

export type Award = {
  title: string
  issuer: string
  date: string
  description?: string
}

export type Achievement = {
  publications: Publication[]
  awards: Award[]
}
export type Contribution = {
  title: string
  organization: string
  date: string
  location?: string
  points: string[]
  links?: { title: string; url: string }[]
}
export interface Project {
  title: string
  description: string
  image: string
  link: string
  tags: string[]
  year: string
  winner?: boolean
  teammates?: string[]
  likes?: number
  comments?: number
}
