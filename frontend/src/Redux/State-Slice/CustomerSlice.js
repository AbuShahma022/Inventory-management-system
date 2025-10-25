import {createSlice} from "@reduxjs/toolkit";

const CustomerSlice = createSlice({
    name: "customer",
    initialState: {
        List: [],
        ListTotal: 0,
    },

    reducers: {
        setCustomerList: (state, action) => {
            state.List = action.payload;
        },
        setCustomerListTotal: (state, action) => {
            state.ListTotal = action.payload;
        }
    }
});
export const {setCustomerList, setCustomerListTotal} = CustomerSlice.actions;

export default CustomerSlice.reducer;