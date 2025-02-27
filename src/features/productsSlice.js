import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const viewProduct = createAsyncThunk(
  'products/viewProduct',
  async (id, { getState }) => {
    const state = getState();
    const product = state.products.find((product) => product.id === id);
    return product;
  }
);

const reassignIDs = (state) => {
  state.forEach((product, index) => {
    product.no = index + 1;
  });
};

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        id: Date.now(),
        ...action.payload,
      };
      state.push(newProduct);
      reassignIDs(state);
      toast.success('Product added successfully !');
    },
    updateProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const taskIndex = state.findIndex((product) => product.id === id);
      if (taskIndex !== -1) {
        state[taskIndex] = { id, ...updatedProduct };
        reassignIDs(state);
      }
      toast.success('Product updated successfully !');
    },
    deleteProduct: (state, action) => {
      const index = state.findIndex((product) => product.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
        reassignIDs(state);
      }
      toast.success('Product deleted successfully !');
    },
    clearAllProducts: (state) => {
      state.length = 0;
    },
  },
});

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
  clearAllProducts,
} = productsSlice.actions;
export default productsSlice.reducer;
