import './App.css';
import MessageList from "./componets/message";

function App() {
  return (
    <>
      <div className="container w-80 px-1 max-h-full overflow-y-auto">
        <p className="subpixel-antialiased font-bold text-xl text-center">Admin Messages</p>
        <MessageList/>
      </div>
    </>
  );
}

export default App;
