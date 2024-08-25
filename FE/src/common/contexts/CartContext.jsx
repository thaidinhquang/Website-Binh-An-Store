import  { createContext, useContext, useReducer } from 'react'

const cartContext = createContext();
const initialState= {
    items: [],
};
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ITEMS_CART':
    return { ...state, items: Array.isArray(action.payload) ? action.payload : [] };
        case 'REMOVE_ITEMS':
            return { ...state, items: state.items.filter(item => item._id !== action.payload) };
        case 'ADD_ITEMS':
            return { ...state, items: [...state.items, action.payload] };
        case 'REMOVE_ALL':
            return { ...state, items: [] };
        default:
            return state;
    }
};


const CartProvider = ({children}) => {

    const [state, dispatch]=useReducer(cartReducer,initialState);

  return (
    <cartContext.Provider value={{state,dispatch}}>
      {children}
    </cartContext.Provider>
  )
}

const useCart= ()=>{
    const context = useContext(cartContext);
    if(!context){
        console.log("error")
    }
    return context
}
export  {CartProvider, useCart}
