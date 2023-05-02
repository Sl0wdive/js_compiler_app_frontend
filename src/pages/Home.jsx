import React, { useState } from "react";
import CodeEditor from '../components/CodeEditor';
import Button from '@mui/material/Button';


function Home() {
  
  const javascriptDefault = `сonsole.log(32);`;
  const [code, setCode] = useState(javascriptDefault);
  const [theme] = useState('mytheme');

  const OnClick = () => {
    alert(code);
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

  return(
    <>
    <CodeEditor
      code={code}
      onChange={onChange}
      theme={theme.value}
    />
    <Button onClick={OnClick} variant="contained">Алерт код</Button>
    </>
  )
}

export default Home;