import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import filter from 'leo-profanity';
import { io } from 'socket.io-client';
import store from './store';
import App from './App';
import resources from './locales';
import SocketContext from './context/socket';

const init = async () => {
  const i18n = i18next.createInstance();
  await i18n.init({
    lng: 'ru',
    resources,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  const socket = io();

  return (
    <SocketContext.Provider value={socket}>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <div className="h-100 d-flex flex-column justify-content-between">
            <App />
          </div>
        </I18nextProvider>
      </Provider>
    </SocketContext.Provider>

  );
};

export default init;
