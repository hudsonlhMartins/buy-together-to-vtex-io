import { useCallback } from "react"
import { IInstallmentsProps } from "."

export const useInstallements = ()=>{

  const getInstallements = useCallback(({installments, paymentName, withTax}:IInstallmentsProps)=>{
    const paymenteFlagCard = installments.filter(el=> {
      if(withTax) return (el.PaymentSystemName === paymentName)
      return (el.PaymentSystemName === paymentName && el.Name.includes('sem juros') || el.PaymentSystemName === paymentName && el.Name.includes('à vista'))
    })

    const endParcel = paymenteFlagCard[paymenteFlagCard.length -1]

    if(!endParcel) return null


    return {
      value: endParcel.Value,
      numberOfInstallments: endParcel.NumberOfInstallments
    }

  },[])


  return {
    getInstallements
  }
}
