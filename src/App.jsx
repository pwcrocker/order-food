import Header from './components/Header';
import Menu from './components/Menu';
import CartContextProvider from './store/CartContextProvider';

function App() {
  return (
    <>
      <CartContextProvider>
        <Header />
        <Menu />
      </CartContextProvider>
    </>
  );
}

export default App;
