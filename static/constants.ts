export const regExpList: Record<
  | 'email'
  | 'login'
  | 'firstName'
  | 'lastName'
  | 'userName'
  | 'phone'
  | 'oldPassword'
  | 'newPassword',
  unknown
> = {
  email:
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  login: /^[A-zА-я]{1}[A-zА-я1-9]{2,20}$/,
  firstName: /^[A-zА-я]{1}[A-zА-я]{2,20}$/,
  lastName: /^[A-zА-я]{1}[A-zА-я]{2,20}$/,
  userName: /^[A-zА-я]{1}[A-zА-я]{2,20}$/,
  phone:
    /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im,
  oldPassword: /qwerty/,
  newPassword: /[A-Za-z0-9]{6,64}/,
};
