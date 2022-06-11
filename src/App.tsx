import React from 'react';
import {Todo} from "./components/todo/Todo";
import {Title} from "./components/title/Title";

function App() {
    return (
        <div>
            <Title title={'todos'}/>
            <Todo/>
        </div>
    );
}

export default App;
