//type definition for wine product card
export interface Wine {
  id: number
  wine: string
  image: string
  rating: {
    average: string
    reviews: string
  }
  location: string
  winery: string
}


