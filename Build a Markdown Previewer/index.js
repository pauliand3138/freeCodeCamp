marked.setOptions({
    breaks: true
})

const renderer = new marked.Renderer();
const string = ''
function App() {
    const [text, setText] = React.useState(`# Welcome to my React Markdown Previewer!
## This is a sub-heading...
There's also [links](https://www.freecodecamp.org)
Heres some code, \`<div></div>\`, between 2 backticks.
\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
You can also make text **bold**... whoa!
- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

> Block Quotes!
![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`);
    return (
    <div className="text-center px-4">
        <h1 className="p-4">My Markdown Previewer</h1>
        <textarea 
            name="text" 
            id="editor" 
            rows="10" 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            className="textarea">
        </textarea>
        <h3 className="mt-3">Output</h3>
        <Preview markdown={text}/>
    </div>
    )
}

function Preview({markdown}) {
    return (
        <div 
        dangerouslySetInnerHTML=
            {{__html: marked(markdown, {render: renderer})}}
        id="preview">
        
        </div>
    )
}
ReactDOM.render(<App/>,document.getElementById("root"));