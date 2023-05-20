import React, { useState } from "react";
import CodeEditor from '../components/CodeEditor';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { key, host  } from '../passwords.js';
import axios from "../axios";
import Output from "../components/Output";
import { useDispatch, useSelector } from 'react-redux';
import { SelectisAuth } from '../redux/slices/auth';
import DraftsRow from '../components/DraftsRow';

function Home() {
  
  const navigate = useNavigate();
  const javascriptDefault = `console.log(2**4);`;
  const isAuth = useSelector(SelectisAuth);
  const [code, setCode] = useState(javascriptDefault);
  const [theme] = useState('mytheme');
  const [processing, setProcessing] = useState(null);
  const [outputDetails, setOutputDetails] = useState(null);
  const [draftMain, setDraftMain] = React.useState(null);
  const [draftLoading, setDraftLoading] = React.useState(true);
  const {id} = useParams();  


  const showErrorToast = (msg, timer) => {
  };

    
  React.useEffect(() =>{
    if (id){
    axios.get(`/${id}`)
    .then(res =>{
        setDraftMain(res.data);
        setDraftLoading(false);
        setCode(res.data.content);
    }).catch((err) =>{
        console.warn(err);
        alert('Error');
    });
  }
  }, []);

  if (id){
    if (!window.localStorage.getItem('token') && !isAuth){
      return <Navigate to="/"/>
    }
  }

  const onSave = async () => {
    try {

      const fields = {
        content: code
      }

      await axios.post('/', fields) ;

      window.location.reload(false);

    } catch (err) {
      console.warn(err);
      alert('Перевищено обмеження збереження шаблонів');
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/${id}`) ;

    } catch (err) {
      console.warn(err);
      alert("Error");
    }
  };

  console.log("render");

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("Error", action, data);
      }
    }
  };

  const handleCompile = () => {
    const options = {
      method: "POST",
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        "X-RapidAPI-Key": '9192ca1565mshb77eca3efe77bc6p137dd3jsn55d186578615',
        "X-RapidAPI-Host": 'judge0-ce.p.rapidapi.com',
      },
      data: {
        language_id: 63,
        source_code: code,
        stdin: 1, //CInput
      }
    }

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(
            `Requests exceeded for the Day!`,
            1000
          );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };
  
  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: 'https://judge0-ce.p.rapidapi.com/submissions' + '/' + token,
      params: {base64_encoded: 'true'},
      headers: {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": host,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        console.log("response.data", response.data);
        setOutputDetails(response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  
  return(
    <div>
      <div className="ml-4">
        {isAuth ? (
          <>
          <DraftsRow/>
          </>
          ) : (
          <>
            
          </>
        )}
      </div>
    <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          {id ? (<>
            {draftLoading ? (
            <></>) : 
            (
            <CodeEditor
              code={draftMain.content}
              onChange={onChange}
              language={63}
              theme={theme.value}
            />
            )
          }
          </>) : (<>
            <CodeEditor
              code={code}
              onChange={onChange}
              language={63}
              theme={theme.value}
            />
          </>)

          }
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <Output outputDetails={outputDetails} />
          <div className="items-end">
            {isAuth ? (<>
            <button
              onClick={onSave}
              disabled={!code}
              className="mt-4 mr-4 border-2 border-black px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0"
              >
              {"Save"}
            </button>
            {id ? (<>
            <a href="/">
              <button
              onClick={onDelete}
              className="mt-4 mr-4 border-2 border-black px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0"
              >
              {"Delete"}
            </button></a>
            </>) : (<></>)}
            </>):(<></>)}
            <button
              onClick={handleCompile}
              disabled={!code}
              className="mt-4 mr-4 border-2 border-black px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0"
            >
              {"Submit"}
            </button>
          </div>
        </div>
      </div>
      </div>
  )
}

export default Home;