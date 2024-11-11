import RequestForm from "../../components/inquiry/request/RequestForm";
import ColorLine from "../../components/inquiry/ColorLine";

function RequestEditPage() {
  return (
    <>
      <ColorLine />
      <RequestForm isEdit={true} />
    </>
  )
}

export default RequestEditPage;