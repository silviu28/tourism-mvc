import type { FunctionComponent } from "react";
import Collapsible from "../Collapsible";

const TripsPage: FunctionComponent = () => {
  return (
    <>
      <Collapsible title="Frankfurt" thumbnailSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Skyline_Frankfurt_am_Main_2015.jpg/1200px-Skyline_Frankfurt_am_Main_2015.jpg">
        <p>Frankfurt</p>
      </Collapsible>

      <Collapsible title="Tokyo" thumbnailSrc="https://www.japan-guide.com/thumb/destination_tokyo.jpg">
        <p>Tokyo</p>
      </Collapsible>

      <Collapsible title="Transylvania" thumbnailSrc="https://chasingthedonkey.b-cdn.net/wp-content/uploads/2018/04/Draculas-castle_Transylvania_shutterstock_153673181.jpg">
        <p>Transylvania</p>
      </Collapsible>

      <Collapsible title="Grand Canyon" thumbnailSrc="https://upload.wikimedia.org/wikipedia/commons/a/aa/Dawn_on_the_S_rim_of_the_Grand_Canyon_%288645178272%29.jpg">
        <p>Grand Canyon</p>
      </Collapsible>
    </>
  );
};

export default TripsPage;