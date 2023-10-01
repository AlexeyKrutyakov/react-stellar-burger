export default function removeScheme(scheme, token) {
  return token.split(`${scheme} `)[1];
}
