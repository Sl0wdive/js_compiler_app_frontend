import React from 'react';
import axios from '../axios';
import { Link } from 'react-router-dom';


import { useDispatch, useSelector } from 'react-redux';
import { SelectisAuth } from '../redux/slices/auth';


function DraftsRow(props){

  
  const dispatch = useDispatch();
  const isAuth = useSelector(SelectisAuth);
  const userData = useSelector(state => state.auth.data);
  const [draftLoading, setDraftLoading] = React.useState(true);
  const [draft, setDraft] = React.useState();

  axios.get(`/`)
  .then(res =>{
      setDraft(res.data);
      setDraftLoading(false);
  }).catch((err) =>{
      console.warn(err);
      alert('Error');
  });


  return(
    <header className="flex items-center justify-between pt-5 pb-5">
      <div className="flex items-center	">
        {isAuth ? (
          <>
            {(draftLoading ? [...Array(3)] : draft).map((obj, index) =>
                draftLoading ? (
                <></>
            ) : (
                <Link to={`/${obj._id}`}>
                    <button className="mt-0 mr-4 border-2 border-black px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0 w-20 h-20">{index+1}</button>
                </Link>
            ))}
          </>
          ) : (
          <>
            
          </>
          )}
      </div>
    </header>
  );
}

export default DraftsRow;