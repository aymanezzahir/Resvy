// email
export const emailregex: RegExp = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

// password
export const usernameregex: RegExp = /^[a-zA-Z0-9_.-]{3,50}$/;
//password
export const passwordregex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
