import styled from "styled-components";
import ModelEditForm from "../../components/voiceModel/complete/ModelEditForm";

const Container = styled.div`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), linear-gradient(181.35deg, rgba(24, 38, 157, 0.7) -9.39%, rgba(255, 120, 217, 0.7) 119.24%), linear-gradient(180deg, rgba(211, 123, 255, 0) 0%, rgba(211, 123, 255, 0.8) 100%), #000000;
  height: calc(100vh - 6.25rem);
  display: flex;
  justify-content: center;
  align-items: center;
`

function ModelEditPage() {
  return (
    <Container>
      <ModelEditForm />
    </Container>  
  )
}

export default ModelEditPage;