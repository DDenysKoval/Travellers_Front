// import AuthNavigation from "../AuthNavigation/AuthNavigation";
// import css from "./Header.module.css";

// const Header = () => {
//   return (
//     <header>
//       header
//       <AuthNavigation />
//     </header>
//   );
// };

// export default Header;
import { useState } from "react";
import AuthForm from "../../app/(auth routes)/auth/AuthForm/RegistrationForm";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Увійти</button>
      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <AuthForm />
          </div>
        </div>
      )}
    </>
  );
}
