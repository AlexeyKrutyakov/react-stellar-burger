export default function scroll(tabName: string) {
  const element = document.getElementById(tabName);
  if (element) element.scrollIntoView({ behavior: 'smooth' });
}
