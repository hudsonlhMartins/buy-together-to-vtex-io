import React, { ButtonHTMLAttributes} from "react";
import { Spinner } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'

type InputProps = ButtonHTMLAttributes<HTMLButtonElement> & IButtonProps;

const CSS_HANDLES = [
  'primary',
  'secondary',
  'tertiary',
  'back',
  'button-loading',
  'label',

] as const

interface IButtonProps {
    label?: string,
    loading?: boolean,
    typeButton?: "primary" | "secondary" | "tertiary" | "back"
}
export const Button = ({label="comprar", loading=false, typeButton="primary", ...rest}:InputProps) =>{
  const { handles } = useCssHandles(CSS_HANDLES)

    return(
        <button
            className={`${handles[typeButton]} ${loading ? handles['button-loading'] : ""} flex items-center justify-center bn ph5 pv3 bg-orange ttu tc pointer mt5`}
            disabled={loading}
            {...rest}
        >
            {loading && (
                <span className="dib c-muted-1">
                <Spinner color="#000" size={20} />
              </span>
            )}
            {!loading && (
            <span className={`${handles['label']}`}>
                {label}
            </span>)}

        </button>
    )
}
