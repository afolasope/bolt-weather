import {
  LOAD_CITIES,
  GET_CITY_DETAIL_BEGIN,
  GET_CITY_DETAIL_SUCCESS,
  GET_CITY_DETAIL_ERROR,
  ADD_TO_NOTE,
  DELETENOTE,
} from '../actions';

export const details_reducer = (state, action) => {
  if (action.type === GET_CITY_DETAIL_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_CITY_DETAIL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      displayedDetails: action.payload,
      city_error: false,
    };
  }
  if (action.type === GET_CITY_DETAIL_ERROR) {
    return { ...state, isLoading: false, city_error: true };
  }

  if (action.type === LOAD_CITIES) {
    return {
      ...state,
      cities: action.payload.top_cities,
      fav_cities: action.payload.fav_cities,
    };
  }

  // note
  if (action.type === ADD_TO_NOTE) {
    if (!state.notes[action.payload.id]) {
      let tempNote = [
        {
          textId: action.payload.textId,
          text: action.payload.value,
        },
      ];
      state.notes[action.payload.id] = tempNote;
    } else {
      const note = state.notes[action.payload.id].find(
        (note) => note.textId === action.payload.textId
      );
      if (!note) {
        state.notes[action.payload.id].push({
          textId: action.payload.textId,
          text: action.payload.value,
        });
      }
    }

    return {
      ...state,
      notes: { ...state.notes },
    };
  }
  if (action.type === DELETENOTE) {
    const { id, textId } = action.payload;
    const tempNote = state.notes[id].filter((item) => {
      return item.textId !== textId;
    });
    console.log(state.notes);
    return {
      ...state,
      notes: { ...state.notes, [id]: tempNote },
    };
  }
  return state;
};

export default details_reducer;
