export type Contribution = {
  title: string
  organization: string
  date: string
  location?: string
  points: string[]
  links?: { title: string; url: string }[]
}
