export interface SocialLink {
  platform: string
  url: string
  icon?: string
  _id?: string
}

export interface WorkExperience {
  title: string
  designation: string
  location: string
  timePeriod: string
  details: string
  _id?: string
}

export interface Education {
  institution: string
  degree: string
  timePeriod: string
  _id?: string
}

export interface User {
  _id: string
  name: string
  email: string
  profilePicture?: string
  cloudinaryId?: string
  bio?: string
  socialLinks: SocialLink[]
  about?: string
  workExperience: WorkExperience[]
  education: Education[]
  skills: string[]
  createdAt: string
  updatedAt: string
}

export interface Blog {
  _id: string
  title: string
  content: string
  excerpt: string
  slug: string
  published: boolean
  tags: string[]
  featuredImage: string
  cloudinaryId: string
  reader: number
  createdAt: string
  updatedAt: string
}

export interface Project {
  _id: string
  name: string
  description: string
  liveLink: string
  frontendCode: string
  backendCode: string
  timelinePhoto: string
  cloudinaryId: string
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  status: boolean
  message: string
  data: T
}
