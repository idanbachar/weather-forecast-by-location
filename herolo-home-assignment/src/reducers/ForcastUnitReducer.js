const initialState = 'C'

const ForcastUnitReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE':
            state = action.payload;
            return state;
        default:
            return state;
    }
};

export default ForcastUnitReducer;