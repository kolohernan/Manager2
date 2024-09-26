import { useUserContext } from "../context/UserContext";
function Footer() {
  const { txtfooter } = useUserContext();
  return (
    <footer className="footer mt-auto py-2 bg-dark fixed-bottom footer-Manager">
      {/*muestro el texto del footer obtenido en la funcion useLeerCSV que se ejecuta en el layaout*/}
      <div
        className="container"
        dangerouslySetInnerHTML={{ __html: txtfooter }}
      />
    </footer>
  );
}
export default Footer;
