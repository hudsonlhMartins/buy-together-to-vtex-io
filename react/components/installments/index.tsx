import React from "react"
import { Installment } from "../../typings/typings_crossselling"
import { useInstallements } from "./useInstallements"
import { FormattedPrice } from "vtex.formatted-price"
import { useCssHandles } from 'vtex.css-handles'

export interface IInstallmentsProps{
  installments: Installment[]
  paymentName?: string,
  withTax?: boolean
}

const CSS_HANDLES = [
  'container-installments',
  'installments-value',
  'installments-tax',
  'number-installments'

] as const
export const Installments = ({installments, paymentName="American Express", withTax = false}:IInstallmentsProps)=>{
  const { handles } = useCssHandles(CSS_HANDLES)
  const {getInstallements} = useInstallements()

  const _installments = getInstallements({installments, paymentName, withTax})
  if(!_installments) return <></>

  const {value, numberOfInstallments} = _installments
  return (
    <span className={`${handles['container-installments']} flex mr2`}>
      <span className={`${handles['number-installments']} mr2`}>{numberOfInstallments}x de</span>
      <strong className={`${handles['installments-value']} mr2`}><FormattedPrice value={value} /></strong>
      <span className={`${handles['installments-tax']}`}>{withTax ? "com ": "sem "} juros</span>
    </span>
  )
}
