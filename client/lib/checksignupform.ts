import { emailregex, passwordregex, usernameregex } from "~/constants/regex";

export default function checkformsignup(
  email: string,
  username: string,
  password: string,
  cpassword: string
): { valid: boolean; message: string } {

    // initial object
  const object: { valid: boolean; message: string } = {
    valid: true,
    message: "",
  };


  if (!emailregex.test(email)) {
    object.valid= false;
    object.message = "Email invalide"
  }
  if (!usernameregex.test(username)) {
    object.valid= false;
    object.message = "Nom d'utilisateur invalide"
  }
  if (!passwordregex.test(password)) {
    object.valid= false;
    object.message = "Mot de passe trop faible"
  }

  if (password!=cpassword) {
    object.valid= false;
    object.message = "Les mots de passe ne sont pas identiques."
  }

  return object;
}
