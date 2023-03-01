import type { AppProps } from 'next/app';
import React, { ReactElement, ReactNode } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { ApplicationProvider } from '@ui-kitten/components';
import theme from '../styles/eva-styled-system.json';
import { theme as styleSystemTheme } from '../styles/styled-system/styled-system.config';
import mapping from '../../mapping.json';
import * as eva from '@eva-design/eva';
import { Provider } from 'react-redux';
import store, { persistor } from '../redux/store';
import '../../public/fonts/next.css';
import { PersistGate } from 'redux-persist/integration/react';

import { ApolloProvider } from '@apollo/client';
import { NextPage } from 'next';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'styled-components';
import {
  getGoogleAnalyticMeasurementId,
  getGoogleTagManagerId,
} from '../utils/config.web.utils';
import Script from 'next/script';
import { useInitFcl } from '../hooks/fcl/init-fcl.hooks';
import { DefaultSeo, NextSeo } from 'next-seo';
import { getSeoConfig } from '../utils/seo.utils';
import apolloClient from '../api/apollo/apollo-client';
import { CurrencyInit } from '../components/currency/currency-init';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const measurementId = getGoogleAnalyticMeasurementId();
  const tagManagerId = getGoogleTagManagerId();

  const { isInitFCL } = useInitFcl(apolloClient);

  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ApolloProvider client={apolloClient}>
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...theme }}
        customMapping={mapping}
      >
        {pageProps.metadata === undefined ? (
          <DefaultSeo {...getSeoConfig('en')} />
        ) : (
          <NextSeo {...pageProps.metadata} />
        )}
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={styleSystemTheme}>
              <Script
                strategy='lazyOnload'
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
              />

              <Script strategy='lazyOnload'>
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${measurementId}', {
                    page_path: window.location.pathname,
                    });
                `}
              </Script>
              <Script>
                {`
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${tagManagerId}');
                `}
              </Script>
              <CurrencyInit>
                {isInitFCL ? getLayout(<Component {...pageProps} />) : null}
                <noscript>
                  <iframe
                    src={`https://www.googletagmanager.com/ns.html?id=${tagManagerId}`}
                    height='0'
                    width='0'
                    style={{ display: 'none', visibility: 'hidden' }}
                  />
                </noscript>
              </CurrencyInit>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </ApplicationProvider>
    </ApolloProvider>
  );
};

export default appWithTranslation(MyApp);
