export function setCookie(
  name: string,
  value: any,
  options?: { [key: string]: any }
) {
  options = {
    path: '/',
    ...options,
  };

  if (options['max-age'] instanceof Date) {
    options['max-age'] = options['max-age'].toUTCString();
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}`;

  for (let optionKey in options) {
    updatedCookie += `; ${optionKey}`;
    let optionValue: any = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += `=${optionValue}`;
    }
  }

  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  let matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
  setCookie(name, '', {
    'max-age': -1,
  });
}
