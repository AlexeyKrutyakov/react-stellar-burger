export default function scroll(tabName) {
  const element = document.getElementById(tabName);
  if (element) element.scrollIntoView({ behavior: 'smooth' });
}
