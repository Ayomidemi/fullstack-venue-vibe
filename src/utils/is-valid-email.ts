export const isValidEmail = (email: string) => {
  const filter =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!filter.test(email)) return false;

  const [domain] = email.split('@');

  if (domain.split('.').length > 4) return false;

  if (/[0-9]/.test(domain[0])) return false;

  return true;
};
