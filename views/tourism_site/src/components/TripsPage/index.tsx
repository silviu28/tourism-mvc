import type { FunctionComponent } from "react";
import Collapsible from "../Collapsible";

const TripsPage: FunctionComponent = () => {
  return (
    <>
      <Collapsible title="Frankfurt" thumbnailSrc="public/images/bg.jpg">
        <p>Frankfurt</p>
      </Collapsible>

      <Collapsible title="Tokyo" thumbnailSrc="public/images/tokyo.png">
        <p>Tokyo</p>
      </Collapsible>

      <Collapsible title="Transylvania" thumbnailSrc="public/images/transylvania.png">
        <p>Transylvania</p>
      </Collapsible>

      <Collapsible title="Grand Canyon" thumbnailSrc="public/images/grandcanyon.png">
        <p>Grand Canyon</p>
      </Collapsible>
    </>
  );
};

export default TripsPage;