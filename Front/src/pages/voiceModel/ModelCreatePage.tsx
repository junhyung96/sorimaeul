import styled from "styled-components";
import modelBg from "../../assets/modelBg.png";
import ModelForm from "../../components/voiceModel/beforeTrain/ModelForm";

const Container = styled.div`
  background: url(${modelBg});
  height: calc(100vh - 6.25rem);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`

function ModelCreatePage() {
  return (
    <Container>
      <ModelForm />
    </Container>  
  )
}

export default ModelCreatePage;