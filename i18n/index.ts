import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      home: {
        title: 'Home',
        status: 'Grid Power Status',
        powered: 'Connected',
        notPowered: 'Disconnected',
        notifications: 'Notifications',
      },
      logs: {
        title: 'Logs',
        empty: 'No events yet',
        powerOff: 'Power cut-off',
        powerOn: 'Power restored',
        error: 'Error',
      },
      settings: {
        title: 'Settings',
        telegramToken: 'Telegram Bot API Key',
        telegramTokenPlaceholder: 'Enter your bot token',
        telegramChatId: 'Telegram Chat IDs',
        telegramChatIdPlaceholder: 'Enter chat IDs, comma separated',
        powerOffMsg: 'Power Off Message',
        powerOnMsg: 'Power On Message',
        language: 'Language',
        save: 'Save',
      },
    },
  },
  ru: {
    translation: {
      home: {
        title: 'Главная',
        status: 'Статус электросети',
        powered: 'Подключено',
        notPowered: 'Отключено',
        notifications: 'Уведомления',
      },
      logs: {
        title: 'Журнал',
        empty: 'Событий пока нет',
        powerOff: 'Отключение питания',
        powerOn: 'Восстановление питания',
        error: 'Ошибка',
      },
      settings: {
        title: 'Настройки',
        telegramToken: 'API ключ Telegram бота',
        telegramTokenPlaceholder: 'Введите токен бота',
        telegramChatId: 'ID чатов Telegram',
        telegramChatIdPlaceholder: 'Введите ID чатов через запятую',
        powerOffMsg: 'Сообщение при отключении',
        powerOnMsg: 'Сообщение при включении',
        language: 'Язык',
        save: 'Сохранить',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
