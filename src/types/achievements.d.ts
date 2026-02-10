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
