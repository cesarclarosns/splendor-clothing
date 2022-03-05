import { createSlice } from "@reduxjs/toolkit";
import directoryData from "./directoryData";

const directorySlice = createSlice({
  name: "directory",
  initialState: { sections: directoryData },
});

export default directorySlice.reducer;
