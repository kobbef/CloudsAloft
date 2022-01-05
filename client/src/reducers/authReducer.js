import { FETCH_USER } from "../actions/types";


export default function auth_reducer( state = null, action ){
    switch( action.type )
    {
        case FETCH_USER:
            /*
            States:
            null - Unknown state
            false - Not logged in
            UserModel - Logged In
            */
            return action.payload || false;
        default:
            return state;
    }
}