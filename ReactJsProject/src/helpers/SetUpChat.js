import axios from 'axios';
import { Global } from './Global';
//import Swal from 'sweetalert2';

const baseUrl = Global.baseUrl;

export const setUpChat = ( user, setUsers, setMessages, setMessagesDESC, //setMyGroups,
    setMessagesSearch, start = true ) => {

  if ( start ) {

    //Swal.showLoading();

  }

  axios.get( `${baseUrl}chats/${user.nombre}` )
    .then( res => setMessagesSearch( res.data ) );

  axios.get( `${baseUrl}chats/fecha/${user.nombre}` )
    .then( res => {

      setMessagesDESC( res.data );

    });

  axios.get( `${baseUrl}users` )
    .then( res => setUsers( res.data ) );

  axios.get( `${baseUrl}chats/${user.nombre}` )
    .then( res => setMessages( res.data ) );

  //axios.get( `${baseUrl}participantsGroups/grupos/${user.nombre}` )
  //  .then( res => setMyGroups( res.data ) );

  if ( start ) {

    //Swal.close();

  }

};