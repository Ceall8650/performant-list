import useMedia from 'use-media';
import mediaSize from 'utils/mediaSize';
import ListLaptop from './views/List/ListLaptop';
import ListMobile from 'views/List/ListMobile';

function App() {
  const isTablet = useMedia({ maxWidth: mediaSize.tablet })

  return (
    <div className='w-full h-full bg-slate-100 overflow-auto'>
      {
        isTablet ? <ListMobile /> : <ListLaptop />
      }
    </div>
  );
}

export default App;
