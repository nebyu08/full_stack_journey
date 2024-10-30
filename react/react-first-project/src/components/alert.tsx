import { ReactNode } from "react";

interface Prop{
  children:ReactNode;
  onClose:() => void;
}

function Alert({children,onClose}:Prop){
  return(
    <div className="alert alert-primary alert-dismissible">{children}
    <button type="button" onClick={onClose} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  )
}

export default Alert;