import './App.css';
import Toolbox from './components/Toolbox/Toolbox';
import Board from './components/board/Board';
import Toolbar from './components/toolbar/Toolbar';
import BoardProvider from './store/BoardProvider';
import ToolboxProvider from './store/ToolboxProvider';

function App() {
  return (
    <BoardProvider>
      <ToolboxProvider>
        <Toolbar/>
        <Board/>
        <Toolbox/>
      </ToolboxProvider>
    </BoardProvider>
  );
}

export default App;
