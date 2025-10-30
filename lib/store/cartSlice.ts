import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, CartState } from '../types/cart'

const initialState: CartState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      // Differentiate base donation (no label) vs add-on (has label)
      const isAddon = !!action.payload.label
      const existingIndex = state.items.findIndex(item => {
        if (isAddon) {
          return (
            item.projectId === action.payload.projectId &&
            item.label === action.payload.label
          )
        }
        // Base item: match by projectId and no label
        return item.projectId === action.payload.projectId && !item.label
      })

      if (existingIndex >= 0) {
        state.items[existingIndex].amount = action.payload.amount
      } else {
        state.items.push(action.payload)
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        item => item.projectId !== action.payload
      )
    },
    updateItemAmount: (
      state,
      action: PayloadAction<{ projectId: string; amount: number }>
    ) => {
      const item = state.items.find(
        item => item.projectId === action.payload.projectId
      )
      if (item) {
        item.amount = action.payload.amount
      }
    },
    clearCart: state => {
      state.items = []
    },
    removeItemByIndex: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1)
    }
  }
})

export const {
  addItem,
  removeItem,
  updateItemAmount,
  clearCart,
  removeItemByIndex
} = cartSlice.actions
export default cartSlice.reducer
