import { createSlice } from '@reduxjs/toolkit';

export const artistSlice = createSlice({
  name: 'artist',
  initialState: {
    artistsList: [],
    artist: {},
    addArtistModal: false,
  },
  reducers: {
    setArtistsList: (state, action) => {
      state.artistsList = action.payload;
    },
    setArtist: (state, action) => {
      state.artist = action.payload;
    },
    setAddArtistModal: (state, action) => {
      state.addArtistModal = action.payload;
    },
    setAddArtist: (state, action) => {
      if (state.artistsList?.length > 0)
        state.artistsList = [action.payload, ...state.artistsList];
      else state.artistsList = [action.payload];
    },
  },
});

export default artistSlice.reducer;

export const { setArtistsList, setArtist, setAddArtistModal, setAddArtist } = artistSlice.actions;
