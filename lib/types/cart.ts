export interface CartItem {
  projectId: string
  projectSlug: string
  projectTitle: string
  projectImageUrl: string
  amount: number
  currency: string
  label?: string
  description?: string
}

export interface CartState {
  items: CartItem[]
}
