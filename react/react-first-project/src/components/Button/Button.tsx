import styles from './Button.module.css';

interface Prop{
    children:string;
    color?:'primary' | 'secondary';
    onClick:()=>void;
}



function Button({children,color='primary',onClick}:Prop){
    return <button className={[styles.btn,styles['btn-'+color]].join(" ")} type="button" onClick={onClick} > {children} </button>
}

export default Button;