import React, { useState } from "react";

import Editor from "@monaco-editor/react";

const CodeEditor = ({ onChange, language, theme }) => {

    const [text, setText] = React.useState('');
  const onChangeF = React.useCallback((value) => {
    setText(value);
  }, []);

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="35vh"
        width={`50%`}
        language={"javascript"}
        value={text} 
        theme={theme}
        defaultValue="console.log(1);"
        onChange={onChangeF}
      />
    </div>
  );
};
export default CodeEditor;