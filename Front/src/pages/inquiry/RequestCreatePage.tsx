import RequestForm from "../../components/inquiry/request/RequestForm";
import ColorLine from "../../components/inquiry/ColorLine";

function RequestCreatePage() {
  return (
    <>
      <ColorLine />
      <RequestForm isEdit={false} />
    </>
  )
}

export default RequestCreatePage;