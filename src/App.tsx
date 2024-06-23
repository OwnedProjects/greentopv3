import AppWrapper from './AppWrapper';
import Header from './components/Header/Header';

function App() {
  return (
    <>
      <Header />
      <div className="relative isolate px-1 pt-1 lg:px-2">
        <AppWrapper />
      </div>
    </>
  );
}

export default App;
