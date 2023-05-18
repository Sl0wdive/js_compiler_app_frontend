import React, { useState } from "react";
import CodeEditor from '../components/CodeEditor';
import Button from '@mui/material/Button';
import { key, host  } from '../passwords.js';
import axios from "axios";


function Home() {
  
  const javascriptDefault = `сonsole.log(32);`;
  const [code, setCode] = useState(javascriptDefault);
  const [theme] = useState('mytheme');
  const [processing, setProcessing] = useState(null);


  const showErrorToast = (msg, timer) => {
  };

  const OnClick = async () => {
    // alert(code);
  };

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("Буває", action, data);
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
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(
            `Requests exceeded for the Day!`,
            10000
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
        "X-RapidAPI-Key": '9192ca1565mshb77eca3efe77bc6p137dd3jsn55d186578615',
        "X-RapidAPI-Host": 'judge0-ce.p.rapidapi.com',
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
        alert(atob(response.data.stdout));
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  
  
  return(
    <>
    <CodeEditor
      code={code}
      onChange={onChange}
      theme={theme.value}
    />
    <Button onClick={handleCompile} variant="contained">Submit</Button>
    </>
  )
}

export default Home;