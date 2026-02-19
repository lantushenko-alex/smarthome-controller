import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      home: {
        title: 'Home',
        description: 'The app detects grid power-off events. Plug your phone into an outlet; if power goes down, it sends a Telegram message. Do not forget to configure the bot token and chat IDs in the settings.',
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
      backgroundSettings: {
        title: 'Background Execution',
        message: 'To ensure the app runs reliably in the background, please disable "Pause app activity if unused" and set Battery to "Unrestricted" in App Info settings.',
        openSettings: 'Open Settings',
        later: 'Later',
      },
    },
  },
  ru: {
    translation: {
      home: {
        title: 'Главная',
        description: 'Приложение отслеживает отключение электросети. Подключите телефон к розетке; при сбое питания оно отправит сообщение в Telegram. Не забудьте настроить токен бота и ID чатов в настройках.',
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
      backgroundSettings: {
        title: 'Фоновый режим',
        message: 'Для надежной работы приложения в фоновом режиме, пожалуйста, отключите функцию "Удалять разрешения и освобождать место" и установите "Экономия заряда" в положение "Без ограничений" в настройках приложения.',
        openSettings: 'Открыть настройки',
        later: 'Позже',
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
