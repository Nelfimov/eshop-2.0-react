export const fetcherGetUnauthorized = (url: string) =>
  fetch(url).then((res) => res.json());

export const fetcherGetAuthorized = (url: string) =>
  fetch(url, { credentials: 'include' }).then((res) => res.json());

export const fetcherPostAuthorized = (url: string) =>
  fetch(url, { method: 'POST', credentials: 'include' }).then((res) =>
    res.json()
  );
