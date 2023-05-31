import '../styles/globals.scss';
import { ConfigProvider } from 'antd';
import { ExploredBreedsProvider } from './context/exploredBreeds.context';
import { TourProvider } from './context/tour.context';
import { SwiperProvider } from './context/swiper.context';

export default function App({ Component, pageProps }) {
  return (
    <SwiperProvider>
      <ExploredBreedsProvider>
        <TourProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#00BC6B',
              },
            }}
          >
            <Component {...pageProps} />
          </ConfigProvider>
        </TourProvider>
      </ExploredBreedsProvider>
    </SwiperProvider>
  );
}
