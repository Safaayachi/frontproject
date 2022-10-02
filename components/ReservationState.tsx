import React from "react"

type Props = {
  type: string
}

const ReservationState = ({ type }: Props) => {
  const returnText = (type: string) => {
    switch (type) {
      case "Confirmed":
        return "تم تأكيد"
        break
      case "Tentative":
        return "فشل"
        break
      case "Wait":
        return "ألغيت"
        break
      case "Request":
        return "ألغيت"
        break

      default:
        break
    }
  }
  return (
    <div
      className={`px-2 py-1 text-white w-fit text-xxs  ${
        type === "Tentative" && "bg-warning"
      } ${type === "Request" && "bg-danger"} ${
        type === "Wait" && "bg-danger"
      } ${type === "Confirmed" && "bg-success"}`}
    >
      {returnText(type)}
    </div>
  )
}

export default ReservationState
