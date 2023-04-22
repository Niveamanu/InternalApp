import FormComponent from "./FormComponent";
import Test from "./Test";
import Sample from "./Sample";
import { useEffect, useState } from "react";

import Navbar from "./Navbar";
import { data } from "./data1";

function App() {
  const [streamContent, setStreamContent] = useState([]);

  const [currentItem, setCurrentItem] = useState(0);

  useEffect(() => {
    setStreamContent(data);
  }, []);

  return (
    <section className="jobs-center">
      <Navbar
        streamContent={streamContent}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
      />
      {/* <Form streamContent={streamContent} currentItem={currentItem} /> */}
      <Sample streamContent={streamContent} currentItem={currentItem} />
    </section>
  );
}

export default App;
