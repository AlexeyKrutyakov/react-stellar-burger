export default function removeScheme(scheme: string, token: string) {
  return token.split(`${scheme} `)[1];
}
