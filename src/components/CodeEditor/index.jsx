import React, { useState } from "react";

import Editor from "@monaco-editor/react";

const CodeEditor = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");
  const onChangeF = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-10xl">
      <Editor
        height="35vh"
        width={`50%`}
        language={"javascript"}
        value={value} 
        theme={theme}
        defaultValue="console.log(1);"
        onChange={onChangeF}
      />
      
    </div>
  );
};
export default CodeEditor;