const ru = {
  translation: {
    header: {
      logout: 'Выйти',
    },
    loginPage: {
      title: 'Войти',
      imgAlt: 'главное изображение',
      nickname: 'Ваш ник',
      password: 'Пароль',
      button: 'Войти',
      footer: {
        text: 'Нет аккаунта?',
        link: 'Регистрация',
      },
    },
    signupPage: {
      title: 'Регистрация',
      imgAlt: 'главное изображение для регистрации',
      nickname: 'Имя пользователя',
      password: 'Пароль',
      passwordConfirm: 'Подтвердите пароль',
      button: 'Зарегистрироваться',
      footer: {
        text: 'Есть аккаунт?',
        link: 'Вход',
      },
    },
    notFoundPage: {
      title: 'Страница не найдена',
    },
    channels: {
      title: 'Каналы',
      dropdown: {
        delete: 'Удалить',
        rename: 'Переименовать',
      },
    },
    messages: {
      message_one: '{{count}} сообщение',
      message_few: '{{count}} сообщения',
      message_many: '{{count}} сообщений',

    },
    modals: {
      titleRenameChannel: 'Переименовать канал',
      titleDeleteChannel: 'Удалить канал',
      titleAddChannel: 'Добавить канал',
      textDeleteChannel: 'Вы действительно хотите удалить канал?',
    },
    form: {
      labels: {
        channelName: 'Имя канала',
        newMessage: 'Новое сообщение',
      },
      placeholders: {
        message: 'Введите сообщение...',
      },
      buttons: {
        submit: 'Отправить',
        cancel: 'Отменить',
        delete: 'Удалить',
      },
      errors: {
        required: 'Обязательное поле',
        channelExists: 'Такой канал уже существует',
        range: 'От 3 до 20 символов',
        min: 'Не менее 6 символов',
        userExists: 'Такой пользователь уже существует',
        nickname: 'Неверные имя пользователя или пароль',
        password: 'Неверные имя пользователя или пароль',
        passwordConfirm: 'Неверные имя пользователя или пароль',
        passwordMustMatch: 'Пароли должны совпадать',
      },
    },
    dropdown: {
      toggle: 'Управление каналом',
    },
    toast: {
      addChannel: 'Канал создан',
      deleteChannel: 'Канал удалён',
      renameChannel: 'Канал переименован',
      errorNetwork: 'Ошибка соединения',
      errorMessage: 'Ошибка отправки сообщения',
    },
  },
};
export default ru;
