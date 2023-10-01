import { useEffect } from "react";

export default function NotFound404() {

  useEffect(() => {
    document.title = 'Stellar Burgers: Not found 404';
  });

  return (
    <h1>Страница не найдена</h1>
  );
}
