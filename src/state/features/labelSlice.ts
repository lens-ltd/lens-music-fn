import { createSlice } from "@reduxjs/toolkit";

export const labelSlice = createSlice({
    name: 'label',
    initialState: {
        labelsList: [],
        label: {},
        addLabelModal: false,
    },
    reducers: {
        setLabelsList: (state, action) => {
            state.labelsList = action.payload;
        },
        setLabel: (state, action) => {
            state.label = action.payload;
        },
        setAddLabelModal: (state, action) => {
            state.addLabelModal = action.payload;
        },
    },
});

export default labelSlice.reducer;

export const { setLabelsList, setLabel, setAddLabelModal } = labelSlice.actions;
