import '../styles/globals.scss';
import { ConfigProvider } from 'antd';
import { ExploredBreedsProvider } from './context/exploredBreeds.context';
import { TourProvider } from './context/tour.context';
import { SwiperProvider } from './context/swiper.context';
import { ModalsProvider } from './context/modals.context';
import { GlobalProvider } from './context/global.context';

export default function App({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <ModalsProvider>
        <SwiperProvider>
          <ExploredBreedsProvider>
            <TourProvider>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#00BC6B'
                  }
                }}>
                <Component {...pageProps} />
              </ConfigProvider>
            </TourProvider>
          </ExploredBreedsProvider>
        </SwiperProvider>
      </ModalsProvider>
    </GlobalProvider>
  );
}
