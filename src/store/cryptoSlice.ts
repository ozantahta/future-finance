import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getTopCryptos, CryptoData } from '@/services/crypto';
import { mockCryptoData } from '@/services/mockData';

interface CryptoState {
  data: CryptoData[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  usingMockData: boolean;
}

const initialState: CryptoState = {
  data: [],
  loading: false,
  error: null,
  lastUpdated: null,
  usingMockData: false,
};

export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getTopCryptos(20);
      return { data, usingMockData: false };
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Failed to fetch crypto data');
    }
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoData.fulfilled, (state, action: PayloadAction<{ data: CryptoData[]; usingMockData: boolean }>) => {
        state.loading = false;
        state.data = action.payload.data;
        state.usingMockData = action.payload.usingMockData;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.usingMockData = true;
        state.lastUpdated = new Date().toISOString();
      });
  },
});

export default cryptoSlice.reducer; 